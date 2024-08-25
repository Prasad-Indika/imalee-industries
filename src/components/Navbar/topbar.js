import React from 'react'
import LogoutButton from '@/common/components/LogoutButton'

export default function TopBar() {
  return (
    <div className='flex justify-end items-center rounded-lg bg-white h-16 w-full p-4'>
        <LogoutButton/>
    </div>
  )
}
