'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import AppButton from '@/common/components/AppButton'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, saveUser } from '@/service/User'
import { ModalUserAddUpdate } from '../ModalUserAddUpdate'
import AppTable from '@/common/components/AppTable'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

export default function UserHome() {

  const dispatch = useDispatch();
  const [visible,setVisible] = useState(false)
  const [userTableData,setUserTableData] = useState([]);
  const userData = useSelector((state)=>state.usersSlice.user);

  const columns = [
    {label:"Full Name",field:"fullName"},
    {label:"Contact No",field:"contactNo"},
    {label:"NIC",field:"nic"},
    {label:"Username",field:"userName"},
    {label:"Password",field:"password"},
    {label:"Action",field:"action"}
  ]

  useEffect(()=>{
    dispatch(getAllUsers());
  },[])
  
  useEffect(()=>{
    if(userData.isSuccess){
        const data = userData?.data;
       
        if(Array.isArray(data)){
            const array = data.map((val,index)=>({
              id:index,
              fullName:val.fullName,
              contactNo:val.contactNo,
              nic:val.nic,
              userName:val.userName,
              password:val.password,
              action:(<>
                <div className='flex gap-3'>
                  <AiOutlineEdit size={"20px"} onClick={()=>{}} />
                  <AiOutlineDelete size={"20px"} onClick={()=>{}}/>
                </div>
              </>)
            }))
          setUserTableData(array);     
        }
    }
    
},[userData.data,userData.isSuccess])

  return (
    <div className='flex flex-col gap-4'>
        <div>
            <div className='flex justify-between'>
                <h1 className='text-3xl mb-3'>Users</h1>
                <AppButton 
                    name={'Add New User'}
                    onClick={()=>{setVisible(true)}}/>
            </div>
           
            <hr className="border-t border-gray-300" />
        </div>
        
        <div>
            <AppTable columns={columns} data={userTableData}/>
        </div>

        {visible && 
          <ModalUserAddUpdate
            visible={visible}
            onClose={()=>{setVisible(false)}}
          />
        }

    </div>
  )
}
