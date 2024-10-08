'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import AppButton from '@/common/components/AppButton'
import { ModalCustomerAddUpdate } from '../ModalCustomerAddUpdate';
import AppTable from '@/common/components/AppTable';


export default function CustomerHome() {

  const [visible,setVisible] = useState(false);

  const columns = [
      {label:"Full Name",field:"fullName"},
      {label:"Contact No",field:"contactNo"},
      {label:"Email",field:"email"},
      {label:"Address",field:"address"},
      {label:"Action",field:"action"}
    ]

  const users = [
    { id:1 , fullName: "Prasad Indika", contactNo: "0770856422", email: "prasad@gmail.com", address: "Wennappuwa", action: (<><Button> Edit </Button><Button> Delete </Button></>) },
    { id:2 , fullName: "Raveen Yasintha", contactNo: "0770856422", email: "prasad@gmail.com", address: "Wennappuwa", action: (<><Button> Edit </Button><Button> Delete </Button></>) },
    { id:3 , fullName: "Piyumal Fernando", contactNo: "0770856422", email: "prasad@gmail.com", address: "Wennappuwa", action: (<><Button> Edit </Button><Button> Delete </Button></>) },
    { id:4 , fullName: "Kasun Delgolla", contactNo: "0770856422", email: "prasad@gmail.com", address: "Wennappuwa", action: (<><Button> Edit </Button><Button> Delete </Button></>) },
    { id:5 , fullName: "Jeewa", contactNo: "0770856422", email: "prasad@gmail.com", address: "Wennappuwa", action: (<><Button> Edit </Button><Button> Delete </Button></>) },
    { id:6 , fullName: "Thushan", contactNo: "0770856422", email: "prasad@gmail.com", address: "Wennappuwa", action: (<><Button> Edit </Button><Button> Delete </Button></>) },
    { id:7 , fullName: "Raavi", contactNo: "0770856422", email: "prasad@gmail.com", address: "Wennappuwa", action: (<><Button> Edit </Button><Button> Delete </Button></>) },
    

  ];

  
  return (
    <div className='flex flex-col gap-4'>
        <div>
            <div className='flex justify-between'>
                <h1 className='text-3xl mb-3'>Customers</h1>
                <AppButton 
                    name={'Add New Customer'}
                    onClick={()=>{setVisible(true)}}/>
            </div>
           
            <hr className="border-t border-gray-300" />
        </div>
        
        <div>
            <AppTable columns={columns} data={users}/>
        </div>

        {visible && 
          <ModalCustomerAddUpdate
            visible={visible}
            onClose={()=>{setVisible(false)}}
          />
        }
    </div>
  )
}
