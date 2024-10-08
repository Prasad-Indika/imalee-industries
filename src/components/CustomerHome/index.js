'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import AppButton from '@/common/components/AppButton'
import { ModalCustomerAddUpdate } from '../ModalCustomerAddUpdate';

export default function CustomerHome() {

  const [visible,setVisible] = useState(false);

  
  return (
    <div className='flex flex-col gap-4'>
        <div>
            <h1 className='text-3xl mb-3'>Customers</h1>
            <hr className="border-t border-gray-300" />
        </div>
        <div className='flex justify-end'>
            <AppButton 
              name={'Add New Customer'}
              onClick={()=>{setVisible(true)}}/>
        </div>

        {visible && 
          <ModalCustomerAddUpdate
            visible={visible}
            onClose={()=>{setVisible(false)}}
          />
        }
    </div>
  )
}
