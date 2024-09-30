'use client'
import ReduxProvider from '@/provider/ReduxProvider'
import Image from 'next/image'
import React from 'react'

export default function AuthLayout({children}) {

  return (
    <div className='flex min-h-screen w-full justify-between font-serif'>
      <ReduxProvider>
        {children}
      </ReduxProvider>
        
        <div className='flex h-screen w-full sticky top-0 items-center justify-end bg-sky-100 max-lg:hidden'>
            <Image
                src="/images/login-pic.jpg"
                width={600}
                height={600}
                className='rounded-xl object-contain'
            />
        </div>
    </div>
  )
}
