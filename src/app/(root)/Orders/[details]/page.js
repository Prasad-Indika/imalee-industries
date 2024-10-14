import OrderDetails from '@/components/OrderDetails'
import React from 'react'

export default function ProductDetails({params}) {
    const {details} = params
  return (
    <OrderDetails orderId={details}/>
  )
}
