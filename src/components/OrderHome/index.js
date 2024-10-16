'use client'
import React, { useEffect, useState } from 'react'
import AppButton from '@/common/components/AppButton'
import Link from 'next/link'
import { ModalOrderAdd } from '../ModalOrderAdd'
import { Toggle } from "@/components/ui/toggle"
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, getCompleteOrders, getPendingOrders } from '@/service/Order'
import { AiOutlineDelete, AiOutlineEdit,AiOutlineArrowRight } from 'react-icons/ai'

import AppTable from '@/common/components/AppTable'
import { useRouter } from 'next/navigation'


export default function OrderHome() {

  const router = useRouter();
  const dispatch = useDispatch()
  const [visible,setVisible] = useState();
  const [pendingOrderTableData,setPendingOrderTableData] = useState([]);
  const [completeOrderTableData,setCompleteOrderTableData] = useState([]);
  const [isPending,setIsPending] = useState(true);
  const pendingOrderData = useSelector((state)=>state.pendingOrdersSlice.order)
  const completeOrderData = useSelector((state)=>state.completeOrdersSlice.order)

  const columns = [
    {label:"Customer Name",field:"customerName"},
    {label:"Description",field:"description"},
    {label:"Total Amount",field:"totalAmount"},
    {label:"Paid Amount",field:"paidAmount"},
    {label:"Action",field:"action"}
  ]


  useEffect(()=>{
    dispatch(getPendingOrders());
    dispatch(getCompleteOrders());
  },[])


  useEffect(()=>{
    if(pendingOrderData.isSuccess){
        const data = pendingOrderData?.data;
        if(Array.isArray(data)){
           
          const array = data.map((val,index)=>({
            id:index,
            customerName:val.customer.fullName,
            description:val.description,
            totalAmount:val.totolAmount,
            paidAmount:val.paidAmount,
            action:(<>
              <div className='flex gap-3'>
                  <AiOutlineArrowRight size={"20px"} onClick={()=>{router.push(`Orders/${val._id}`)}} />
              </div>
            </>)
          }))
          setPendingOrderTableData(array);
               
        }
    }
    
  },[pendingOrderData.data,pendingOrderData.isSuccess])

  useEffect(()=>{
    if(completeOrderData.isSuccess){
        const data = completeOrderData?.data;
        if(Array.isArray(data)){
           
          const array = data.map((val,index)=>({
            id:index,
            customerName:val.customer.fullName,
            description:val.description,
            totalAmount:val.totolAmount,
            paidAmount:val.paidAmount,
            action:(<>
              <div className='flex gap-3'>
                  <AiOutlineArrowRight 
                      size={"20px"} 
                      onClick={()=>{
                          router.push(`Orders/${val._id}`)
                        }} 
                      />
              </div>
            </>)
          }))
          setCompleteOrderTableData(array);
        }
    }
    
  },[completeOrderData.data,completeOrderData.isSuccess])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <div className='flex gap-2'>
              <h1 className="text-3xl mb-3">{isPending? "Ongoing Orders" : "Complete Orders"}</h1>
              <AppButton name={'Change'} onClick={()=>{setIsPending(!isPending)}}/>
          </div>
         
          <AppButton
            name={"Add New Order"}
            onClick={() => {
              setVisible(true);
            }}
          />
          {/* <Link href={'/Orders/10'}>new</Link> */}
        </div>

        <hr className="border-t border-gray-300" />
      </div>

      <div>
        {isPending ? <AppTable columns={columns} data={pendingOrderTableData} /> : <AppTable columns={columns} data={completeOrderTableData} /> }
        
      </div>

      {visible && (
        <ModalOrderAdd
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}

    </div>
  )
}