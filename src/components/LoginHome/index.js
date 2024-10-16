'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '@/service/User';

export default function LoginHome() {
    const dispatch = useDispatch()
    const router = useRouter();
    const allUsersData = useSelector((state=>state.usersSlice.user))

    const handleLogin = ()=>{
        localStorage.setItem('token','100')
        router.push('/')
    }
  return (
    <div className='flex flex-col gap-7 font-sans'>
        <h1 className='text-3xl font-bold text-gray-900'>IMALEE INDUSTRIES</h1>
        <div>
            <h1 className='text-4xl'>Sign In</h1>
            <h1 className='text-lg text-gray-400'>Please Enter Login Details</h1>
        </div>
        <div>
            <Input
                placeholder={'Username'}

            />
        </div>
        <div>
            <Input
                placeholder={'Password'}

            />
        </div>
        <div>
            <Button 
                className='w-full'
                onClick={()=>{
                    handleLogin();
                    //console.log(allUsersData?.data);                    
                }}

                >Sign in</Button>
        </div>
        {/* <div>
            <Button 
                className='w-full'
                onClick={()=>{
                    dispatch(getAllUsers());
                }}

                >Get</Button>
        </div> */}
    </div>
  )
}
