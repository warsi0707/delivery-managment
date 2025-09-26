'use client'
import OrderDetails from '@/pages/OrderDetails'
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
  const {id} = useParams()

  return (
    <div className=''>
      <OrderDetails id={id}/>
    </div>
  )
}
