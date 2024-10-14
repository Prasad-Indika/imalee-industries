"use client";
import React, { useEffect, useState } from "react";
import AppButton from "@/common/components/AppButton";
import { ModalProductAddUpdate } from "../ModalProductAddUpdate";
import AppTable from "@/common/components/AppTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "@/service/Product";
import { AiOutlineDelete ,AiOutlineEdit } from "react-icons/ai";

export default function ProductHome() {

  const [visible, setVisible] = useState(false);
  const [loader,setLoader] = useState(false);
  const [editModalVisible,setEditModalVisible] = useState(false);
  const [selectedProduct,setSelectedProduct] = useState({});
  const [productTableData,setProductTableData] = useState([]);
  const productData = useSelector((state)=>state.productSlice.product)
  const deleteProductData = useSelector((state)=>state.deleteProductSlice.product)
  const dispatch = useDispatch();

  const columns = [
    {label:"Product Name",field:"productName"},
    {label:"Description",field:"description"},
    {label:"Unit Price",field:"unitPrice"},
    {label:"Cost",field:"cost"},
    {label:"Profit",field:"profit"},
    {label:"Action",field:"action"}
  ]

const handleEdit = (val)=>{
  setEditModalVisible(true);
  setSelectedProduct(val)
}

const handleDelete = (id)=>{
  setLoader(true);
  dispatch(deleteProduct(id))
}

useEffect(()=>{
  dispatch(getAllProducts())
},[])

useEffect(()=>{
  if(productData.isSuccess){
      const data = productData?.data;
      if(Array.isArray(data)){
          const array = data.map((val,index)=>({
            id:index,
            productName:val.productName,
            description:val.description,
            unitPrice:val.unitPrice,
            cost:val.cost,
            profit:val.profit,
            action:(<>
              <div className='flex gap-3'>
                <AiOutlineEdit size={"20px"} onClick={()=>{handleEdit(val)}} />
                <AiOutlineDelete size={"20px"} onClick={()=>{handleDelete(val._id)}}/>
              </div>
            </>)
          }))
        setProductTableData(array);     
      }
  }
  
},[productData.data,productData.isSuccess])

useEffect(()=>{
if(loader){
    dispatch(getAllProducts())
    setLoader(false);
}else{
  setLoader(false);
}
},[deleteProductData?.data])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl mb-3">Products</h1>
          <AppButton
            name={"Add New Product"}
            onClick={() => {
              setVisible(true);
            }}
          />
        </div>

        <hr className="border-t border-gray-300" />
      </div>

      <div>
        <AppTable columns={columns} data={productTableData} />
      </div>

      {visible && (
        <ModalProductAddUpdate
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}

      {editModalVisible && (
        <ModalProductAddUpdate
          visible={editModalVisible}
          onClose={() => {
            setEditModalVisible(false);
          }}
          edit={true}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
