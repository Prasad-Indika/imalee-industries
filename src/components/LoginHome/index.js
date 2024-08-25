'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function LoginHome() {
    const router = useRouter();

    const handleLogin = ()=>{
        localStorage.setItem('token','100')
        router.push('/')
    }
  return (
    <div className='flex flex-col gap-7 font-sans'>
        <h1 className='text-2xl font-bold text-gray-900'>IMALEE INDUSTRIES</h1>
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
                }}

                >Sign in</Button>
        </div>
    </div>
  )
}
