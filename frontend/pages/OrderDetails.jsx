"use client"
import { BackendUrl } from '@/utils/BackendUrl'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


export default function OrderDetails() {
    const {id} = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("")


    const handleGetOrder =async()=>{
        setLoading(true)
        try{
            const response = await fetch(`${BackendUrl}/admin/order/${id}`,{
                method: 'GET',
                credentials: 'include'
            })
            const result = await response.json()
            if(response.status ==200){
                setLoading(false)
                setData(result.order)
            }else{
                setLoading(false)
                setData({})
            }
            
        }catch(error){
            toast.error("Failed ")
        }
    }
    const handleUpdateStatus =async()=>{
       
        try{
            const response = await fetch(`${BackendUrl}/partner/update-order/${id}`,{
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({status})
            })
            const result = await response.json()
           
            if(response.status ==200){
                handleGetOrder()
                toast.success(result.message)
            }else{
                toast.error(result.error)
            }
        }catch(error){
            toast.error("failed")
        }
    }

    useEffect(()=>{
        if(!id) return 
        handleGetOrder()
    },[id])
    
  return (
 <div className=' min-h-screen w-full  bg-red-400 flex flex-col justify-evenly lg:grid lg:grid-cols-4 '>
      <div className='w-full bg-white flex flex-col gap-10 lg:min-h-screen py-10 lg:py-20 px-5 lg:px-10 col-span-1'>
        <div className='flex justify-between items-center'>
            <h1 className='text-xl md:text-3xl font-semibold'>{data?.title}</h1>
            <p className={`${data.status == 'PENDING'? "bg-yellow-300": "bg-green-400"}  px-5 py-1 rounded-md`}>{data.status}</p>
        </div>
        <div className='flex justify-between border-b-4 py-2'>
            <p>{data.pickupLocation}</p>
            <p>{data.dropLocation}</p>
        </div>
        <div className='bg-slate-200 w-full flex flex-col p-2 gap-5'>
            <p>{data?.assignBy?.username}</p>
            <p>{data?.assignBy?.email}</p>
            <p>Assign Date: {data && data?.cretedAt?.split('T').slice()} </p>
            {data.status === 'DELIVERED' && 
                <p>Deliver Date: {data?.updateAt} </p>
            }
        </div>
        <div className='bg-slate-200 w-full flex flex-col p-2 gap-5'>
           <select value={status} onChange={(e)=> setStatus(e.target.value)} name="" id="" className='border p-2 rounded-md'>
            <option value="">select status</option>
            <option value="PENDING">PENDING</option>
            <option value="DELIVERED">DELIVERED</option>
           </select>
           <button onClick={handleUpdateStatus} className='bg-black text-white p-2 rounded-md cursor-pointer'>Update</button>
        </div>
      </div>
      <div className='w-full bg-slate-500 min-h-screen col-span-3'>
        
      </div>
    </div>
  )
}
