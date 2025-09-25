'use client'
import React, { useEffect, useRef, useState } from 'react'
import OrderInput from './OrderInput'
import toast from 'react-hot-toast'
import { BackendUrl } from '@/utils/BackendUrl'
import { useRouter } from 'next/navigation'

export default function CreateOrder() {
  const titleRef = useRef('')
  const pickupRef = useRef('')
  const dropRef = useRef('')
  const[status, setStatus] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState("")
  const router = useRouter()

  const getParner =async()=>{
    try{
      const response = await fetch(`${BackendUrl}/admin/partners`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          token : localStorage.getItem('token')
        }
      })
      const result = await response.json()
      if(response.status ==200){
        setUsers(result.partners)
      }
    }catch(error){
      toast.error("failed")
    }
  }
  const handleAssign =async(e)=>{
    e.preventDefault()

    const title = titleRef.current.value;
    const pickupLocation = pickupRef.current.value;
    const dropLocation = dropRef.current.value;
    const assignTo = selectedUsers

    try{
      const response = await fetch(`${BackendUrl}/admin/create-order`, {
        method:'POST',
        headers: {
          'Content-Type': "application/json",
          token : localStorage.getItem('token')
        },
        body: JSON.stringify({title, pickupLocation, dropLocation, assignTo,status})
      })
      const result = await response.json()
      if(response.status ==200){
        router.push("/")
        toast.success(result.message)
      }else{
        toast.error(result.error)
      }
    }catch(error){
      toast.error("Failed")
    }
  }
  useEffect(()=>{
    getParner()
  },[selectedUsers])
  return (
    <div className='lg:min-h-screen w-full flex flex-col-reverse justify-evenly lg:flex-row'>
      <div className=' w-full lg:p-20 h-screen'>
        <div className='bg-white p-10 lg:p-20 flex flex-col gap-10 justify-center items-center'>
          <h1 className='text-3xl font-bold'>Create Your Order</h1>
          <div className='w-full  space-y-5'>
            <OrderInput ref={titleRef} label={"Order Title"} type={'text'} placeholder={"Item 1"}/>
            <div className='flex gap-3 justify-between'>
              <OrderInput ref={pickupRef} label={"Pick-Up Location"} type={'text'} placeholder={"Thane"}/>
              <OrderInput ref={dropRef} label={"Drop Location"} type={'text'} placeholder={"Ghatkopar"}/>
            </div>
            <div className='flex w-full justify-between gap-4'>
            <div className=' w-full'>
              <select value={status} onChange={(e)=>setStatus(e.target.value)} name="" id="" className='border w-full p-3 rounded-md outline-none'>
                <option value="">Select Status</option>
                <option value="PENDING">PENDING</option>
                <option value="ASSIGNED">ASSIGNED</option>
                <option value="DELIVERED">DELIVERED</option>
              </select>
            </div>
            <div className=' w-full'>
              <select value={selectedUsers} onChange={(e)=> setSelectedUsers(e.target.value)} name="" id="" className='border w-full p-3 rounded-md outline-none'>
                <option value="">Select Partner</option>
                {users && users.map((item)=>(
                  <option key={item._id} value={item.username}>{item.username}</option>
                ))}
                
                
              </select>
            </div>
            </div>
          </div>
          <button onClick={handleAssign} className='bg-black text-white w-full p-2 rounded-md cursor-pointer'>Assign</button>
        </div>
      </div>
      <div className='hidden lg:flex  w-full h-screen'>
        <div className='w-full h-full p-10 lg:p-20 '>
          <img src="/post.png" alt="" />
        </div>
      </div>
    </div>
  )
}
