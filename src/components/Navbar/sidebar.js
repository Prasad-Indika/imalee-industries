'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { routeLinks } from '@/common/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Sidebar() {

    const pathname = usePathname();

  return (
    <section className='sidebar'>
        <nav className="flex flex-col gap-4">
            <Image
                src={'/images/dash-logo.jpg'}
                width={150}
                height={150}
            />

        {routeLinks.map((item)=>{
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

            return (
                <Link href={item.route} key={item.label}
                    className={cn('sidebar-link', { 'bg-blue-400': isActive })}
                >
                    <div className="relative items-center justify-center">
                        {item.icon}
                    </div>
                    <p className={cn("sidebar-label", { "!text-white": isActive })}>
                        {item.label}
                    </p>
                </Link>
            )
        })}
        </nav>

        <h1>Footer</h1>
    </section>
  )
}
