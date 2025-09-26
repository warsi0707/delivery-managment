'use client'
import OrderCard from "@/components/OrderCard"
import { BackendUrl } from "@/utils/BackendUrl"
import {  useEffect, useState } from "react"

export default function UserDashboard() {
  const [data, setData] = useState([])

  const getOrders =async()=>{
    const response = await fetch(`${BackendUrl}/partner/orders`, {
        method: "GET",
        credentials: 'include'
  })
    const result = await response.json()
    if(response.status ==200){
      setData(result.orders)
    }
    

  }

  useEffect(()=>{
    getOrders()
  },[])
  return (
     <>
        {data.length == 0 ?
        <div className="flex justify-center  items-center min-h-screen">
          <h1 className="text-4xl font-semibold pb-20">No data listed</h1>
        </div>:
        
        <div className='min-h-screen w-full p-10 lg:px-40 flex justify-center flex-wrap md:justify-between gap-5 '>
          {data && data.map((item)=>(
            <OrderCard key={item._id} item={{...item}}/>
          ))}
        </div>
    }
         </>
  )
}
