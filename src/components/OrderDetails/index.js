'use client'
import React, { useState } from 'react'
import AppButton from '@/common/components/AppButton'
import { ModalOrderItemAddUpdate } from '../ModalOrderItemAddUpdate';


export default function OrderDetails({orderId}) {

  const [visible,setVisible] = useState();


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