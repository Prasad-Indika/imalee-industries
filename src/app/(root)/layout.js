'use client'
import Sidebar from '@/components/Navbar/sidebar'
import TopBar from '@/components/Navbar/topbar'
import { redirect } from 'next/navigation'
import React from 'react'

export default function RootLayout({ children }) {

    const login = localStorage.getItem('token')
    if(!login) redirect('/Sign-in')


  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar/>
        <div className="flex size-full flex-col gap-4 p-4 bg-blue-50">
            <TopBar/>
            <div className='flex-grow  rounded-lg bg-white p-4'>
                {children}
            </div>
        </div>
    </main>





    // <div>
    // <header>
    //     <h1>Navigation</h1>
    // </header>
    // <main>{children}</main>
    // <footer>
    //     <p>© 2024 Your Company</p>
    // </footer>
    // </div>
  )
}