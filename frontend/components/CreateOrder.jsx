import React from 'react'
import OrderInput from './OrderInput'

export default function CreateOrder() {
  return (
    <div className='lg:min-h-screen w-full flex flex-col-reverse justify-evenly lg:flex-row'>
      <div className=' w-full lg:p-20 h-screen'>
        <div className='bg-white p-10 lg:p-20 flex flex-col gap-10 justify-center items-center'>
          <h1 className='text-3xl font-bold'>Create Your Order</h1>
          <div className='w-full  space-y-5'>
            <OrderInput label={"Order Title"} type={'text'} placeholder={"Item 1"}/>
            <div className='flex gap-3 justify-between'>
              <OrderInput label={"Pick-Up Location"} type={'text'} placeholder={"Thane"}/>
              <OrderInput label={"Drop Location"} type={'text'} placeholder={"Ghatkopar"}/>
            </div>
            <div className='flex w-full justify-between gap-4'>
            <div className=' w-full'>
              <select name="" id="" className='border w-full p-3 rounded-md outline-none'>
                <option value="">Select Status</option>
                <option value="">PENDING</option>
                <option value="">ASSIGNED</option>
                <option value="">DELIVERED</option>
              </select>
            </div>
            <div className=' w-full'>
              <select name="" id="" className='border w-full p-3 rounded-md outline-none'>
                <option value="">Select Partner</option>
                <option value="">PENDING</option>
                <option value="">ASSIGNED</option>
                <option value="">DELIVERED</option>
              </select>
            </div>
            </div>
          </div>
          <button className='bg-black text-white w-full p-2 rounded-md cursor-pointer'>Assign</button>
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
