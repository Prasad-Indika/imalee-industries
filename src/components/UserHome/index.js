'use client'
import React from 'react'
import { Button } from '../ui/button'
import AppButton from '@/common/components/AppButton'
import { useDispatch } from 'react-redux'
import { saveUser } from '@/service/User'

export default function UserHome() {

  const dispatch = useDispatch();

  const handleSaveUser = ()=>{
    const user = {
      fullName:"Sanduni Udarika",
      contactNo:"0772677792",
      nic:"890233155v",
      userName:"dilusha",
      password:"1234",
      role:"staff"
    }
    dispatch(saveUser(user));
  }

  return (
    <div className='flex flex-col gap-4'>
        <div>
            <h1 className='text-3xl mb-3'>Users Management</h1>
            <hr className="border-t border-gray-300" />
        </div>
        <div className='flex justify-end'>
            <AppButton 
                name={'Add New User'}
                onClick={()=>{
                    handleSaveUser();
                }}
                
            />
        </div>

    </div>
  )
}
