'use client'
import React, { useEffect, useState } from 'react'
import AppButton from '@/common/components/AppButton'
import { ModalOrderItemAddUpdate } from '../ModalOrderItemAddUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderItemByOrder } from '@/service/OrderDetails';


export default function OrderDetails({orderId}) {

  const dispatch = useDispatch();
  const [visible,setVisible] = useState();
  const orderItemsData = useSelector((state)=>state.orderItemsByOrderSlice.orderDetail); 

  useEffect(()=>{
    console.log("working..");
    
    dispatch(getOrderItemByOrder(orderId))
  },[])

  useEffect(()=>{
    if(orderItemsData.isSuccess){
        const data = orderItemsData?.data;
        console.log(data);
        
        if(Array.isArray(data)){
          //   const array = data.map((val,index)=>({
          //     id:index,
          //     fullName:val.fullName,
          //     contactNo:val.contactNo,
          //     email:val.email,
          //     address:val.address,
          //     action:(<>
          //       <div className='flex gap-3'>
          //         <AiOutlineEdit size={"20px"} onClick={()=>{handleEdit(val)}} />
          //         <AiOutlineDelete size={"20px"} onClick={()=>{handleDelete(val._id)}}/>
          //       </div>
          //     </>)
          //   }))
          // setCustomerTableData(array);     
        }
    }
    
},[orderItemsData.data,orderItemsData.isSuccess])
  


  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl mb-3">{orderId}</h1>
          <AppButton
            name={"Add New Item"}
            onClick={() => {
              setVisible(true);
            }}
          />
        </div>

        <hr className="border-t border-gray-300" />
      </div>

      <div>
        {/* <AppTable columns={columns} data={productTableData} /> */}
      </div>

      {visible && 
        <ModalOrderItemAddUpdate
            visible={visible}
            onClose={()=>{setVisible(false)}}
            orderId={orderId}
        />
      }
    </div>
  )
}