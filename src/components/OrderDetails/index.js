'use client'
import React, { useEffect, useState } from 'react'
import AppButton from '@/common/components/AppButton'
import { ModalOrderItemAddUpdate } from '../ModalOrderItemAddUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderItemByOrder, updateOrderItemStatus,deleteOrderItem } from '@/service/OrderDetails';
import AppTable from '@/common/components/AppTable';
import { AiOutlineEdit ,AiOutlineCheck,AiOutlineClose, AiOutlineDelete  } from 'react-icons/ai';
import { ModalOrderComplete } from '../ModalOrderComplete';
import { getOrderById } from '@/service/Order';


export default function OrderDetails({orderId}) {

  const dispatch = useDispatch();
  const [loader,setLoader] = useState(false);
  const [visible,setVisible] = useState();
  const [completeModalVisible,setCompleteModalVisible] = useState(false);
  const [editModalVisible,setEditModalVisible] = useState(false);
  const [selectedItem,setSelectedItem] = useState({});
  const [totalAmount,setTotalAmount] = useState(0);
  const [orderItemTableData,setOrderItemTableData] = useState([])
  const orderItemsData = useSelector((state)=>state.orderItemsByOrderSlice.orderDetail);
  const updateStatusData = useSelector((state)=>state.updateOrderItemStatusSlice.orderDetail);
  const deleteItemsData = useSelector((state)=>state.deleteOrderItemSlice.orderDetail);
  const orderData = useSelector((state)=>state.orderByIdSlice.order);
  
  const columns = [
    {label:"Description",field:"description"},
    {label:"Qty",field:"qty"},
    {label:"Unit Price",field:"unitPrice"},
    {label:"Total",field:"total"},
    {label:"Status",field:"status"},
    {label:"Action",field:"action"}
  ]

  const handleOrderItemDelete = (itemId)=>{
    if(orderData?.data?.status === 'pending'){
      setLoader(true);
      dispatch(deleteOrderItem({orderItemId:itemId,orderId:orderId}));
    }
  }

  const handleStatusUpdate = (id)=>{
    setLoader(true);
    dispatch(updateOrderItemStatus(id));
  }

  const handleEdit = (val)=>{
    if(orderData?.data?.status === 'pending'){
      setSelectedItem(val);
      setEditModalVisible(true);
    }
  }

  useEffect(()=>{
    dispatch(getOrderById(orderId));
    dispatch(getOrderItemByOrder(orderId))
  },[])

  useEffect(()=>{
    if(orderItemsData.isSuccess){
        const data = orderItemsData?.data;
         if(Array.isArray(data)){

          const totalSum = data.reduce((sum, item) => sum + Number(item.total), 0);
          const array = data.map((val,index)=>({
              id:index,
              description:val.description,
              qty:val.qty,
              unitPrice:val.unitPrice,
              total:val.total,
              status:val.status === 'pending' ? 
                  (<>
                      <AiOutlineClose  size={"20px"} onClick={()=>{handleStatusUpdate(val._id)}} />
                  </>) :
                  (<>
                      <AiOutlineCheck size={"20px"}/>
                   </>)
              ,
              action:(<>
                <div className='flex gap-3'>
                  <AiOutlineEdit size={"20px"} onClick={()=>{handleEdit(val)}} />
                  <AiOutlineDelete size={"20px"} onClick={()=>{handleOrderItemDelete(val._id)}}/>
                </div>
              </>)
            }))
          setTotalAmount(totalSum)
          setOrderItemTableData(array);     
        }
    }
    
},[orderItemsData.data,orderItemsData.isSuccess])

useEffect(()=>{
  if(loader){
    if(updateStatusData.isSuccess && !updateStatusData.isLoading){
        dispatch(getOrderItemByOrder(orderId))
        setLoader(false);
    }else{
        console.log("data Not saved..");
        setLoader(false);
    }
  }
},[updateStatusData.data,updateStatusData.errorMessage])

useEffect(()=>{
  if(loader){
    if(deleteItemsData.isSuccess && !deleteItemsData.isLoading){
        dispatch(getOrderItemByOrder(orderId))
        setLoader(false);
    }else{
        console.log("data Not saved..");
        setLoader(false);
    }
  }
},[deleteItemsData.data,deleteItemsData.errorMessage])
  


  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <div>
              <h1 className="text-[14px] mb-1">Customer : {orderData?.data?.customer?.fullName}</h1>
              <h1 className="text-[14px] mb-1">Order on : {orderData?.data?.orderDate}</h1>
              {orderData?.data?.status === 'complete' ? <h1 className="text-[14px] mb-1">Complete on : {orderData?.data?.completeDate}</h1> :""}
          </div>
          
          <div className='flex gap-3'>
              <div>
                  
                  {orderData?.data?.status === 'complete' ? 
                      <>
                          <h1 className="text-[14px] mb-1">Total : {totalAmount} </h1>
                          <h1 className="text-[14px] mb-1">Paid : {orderData?.data?.paidAmount} </h1>
                          <h1 className="text-[14px] mb-1">Bal : {Number(totalAmount)-Number(orderData?.data?.paidAmount)} </h1>
                      </>
                       :<h1 className="text-2xl mb-3">Total : {totalAmount} </h1> }
                  
              </div>
              
              <AppButton
                  name={"Complete"}
                  onClick={() => {
                    setCompleteModalVisible(true); 
                  }}
                  disabled={orderData?.data?.status === 'complete' ? true : false}
              />

              <AppButton
                  name={"New Item"}
                  onClick={() => {
                    setVisible(true);
                  }}
                  disabled={orderData?.data?.status === 'complete' ? true : false}
              />
          </div>
        </div>

        <hr className="border-t border-gray-300" />
      </div>

      <div>
        <AppTable columns={columns} data={orderItemTableData} />
      </div>

      {visible && 
        <ModalOrderItemAddUpdate
            visible={visible}
            onClose={()=>{setVisible(false)}}
            orderId={orderId}
        />
      }
      {editModalVisible && 
          <ModalOrderItemAddUpdate
              visible={ModalOrderItemAddUpdate}
              onClose={()=>{setEditModalVisible(false)}}
              orderId={orderId}
              orderItem={selectedItem}
              edit={true}
          />
      }
      {completeModalVisible && 
          <ModalOrderComplete
              visible={completeModalVisible}
              onClose={()=>{setCompleteModalVisible(false)}}
              total={totalAmount}
              orderId={orderId}
          />
      }
    </div>
  )
}