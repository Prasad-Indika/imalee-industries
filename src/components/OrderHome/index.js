'use client'
import React from 'react'
import { Button } from '../ui/button'
import AppButton from '@/common/components/AppButton'

export default function OrderHome() {
  return (
    <div className='flex flex-col gap-4'>
        <div>
            <h1 className='text-3xl mb-3'>Orders Management</h1>
            <hr className="border-t border-gray-300" />
        </div>
        <div className='flex justify-end'>
            <AppButton name={'New Order'}/>
        </div>

    </div>
  )
}