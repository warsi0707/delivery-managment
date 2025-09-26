'use client'
import OrderCard from "@/components/OrderCard";
import { UserAuthContext } from "@/context/AuthContext";
import { BackendUrl } from "@/utils/BackendUrl";
import { useContext, useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getOrders =async()=>{
    setLoading(true)
    try{
      const response = await fetch(`${BackendUrl}/admin/orders`, {
        method: "GET",
        credentials: 'include'
  })
  const result = await response.json()
  
  if(response.status ==200){
    setLoading(false)
    setData(result.orders)
  }else{
    setLoading(false)
    setData([])
  }
 
    }catch(error){
      console.error(error)
    }
  }
  useEffect(()=>{
    getOrders()
  },[])

  if(loading){
    return (
      <div className="flex justify-center  items-center min-h-screen">
      <h1 className="text-4xl font-semibold pb-20">Loading...</h1>
    </div>
    )
  }
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
