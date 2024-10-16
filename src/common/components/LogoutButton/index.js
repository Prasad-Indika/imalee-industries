'use client'
import React from 'react'
import { Button } from '../../../components/ui/button'
import { RemoveItem } from '@/common/utils/localStore'
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from "react-icons/ai";


export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = ()=>{
        RemoveItem('token');
        router.push('/Sign-in')        
    }
  return (
    <div>
        <Button variant="outline" size="icon" >
            <AiOutlineLogout size={"20px"} onClick={handleLogout}/>
        </Button>
    </div>
  )
}
