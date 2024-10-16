'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '@/service/User';
import { userLogin } from '@/actions/userActions';

export default function LoginHome() {
    const dispatch = useDispatch()
    const router = useRouter();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = async ()=>{

        const loginDetails = {
            userName:userName,
            password:password
        }

        const loginResult = await userLogin(loginDetails)
        if(loginResult.success){
            const token = loginResult?.token
            localStorage.setItem('token',token)
            router.push("/")
        }
        
        // router.push('/')
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
                value={userName}
                onChange={(e)=>{setUserName(e.target.value)}}

            />
        </div>
        <div>
            <Input
                placeholder={'Password'}
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}

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
    </div>
  )
}
