"use client";
import React, { useEffect, useState } from "react";
import AppButton from "@/common/components/AppButton";
import { ModalCustomerAddUpdate } from "../ModalCustomerAddUpdate";
import AppTable from "@/common/components/AppTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getAllCustomer } from "@/service/Customer";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function CustomerHome() {
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [customerTableData, setCustomerTableData] = useState([]);
  const customerData = useSelector((state) => state.customersSlice.customer);
  const deleteCustomerData = useSelector(
    (state) => state.deleteCustomerSlice.customer
  );
  const dispatch = useDispatch();

  const columns = [
    { label: "Full Name", field: "fullName" },
    { label: "Contact No", field: "contactNo" },
    { label: "Email", field: "email" },
    { label: "Address", field: "address" },
    { label: "Action", field: "action" },
  ];

  const handleEdit = (val) => {
    setEditModalVisible(true);
    setSelectedCustomer(val);
  };

  const handleDelete = (id) => {
    setLoader(true);
    dispatch(deleteCustomer(id));
  };

  useEffect(() => {
    dispatch(getAllCustomer());
  }, []);

  useEffect(() => {
    if (customerData.isSuccess) {
      const data = customerData?.data;
      if (Array.isArray(data)) {
        const array = data.map((val, index) => ({
          id: index,
          fullName: val.fullName,
          contactNo: val.contactNo,
          email: val.email,
          address: val.address,
          action: (
            <>
              <div className="flex gap-3">
                <AiOutlineEdit
                  size={"20px"}
                  onClick={() => {
                    handleEdit(val);
                  }}
                />
                <AiOutlineDelete
                  size={"20px"}
                  onClick={() => {
                    handleDelete(val._id);
                  }}
                />
              </div>
            </>
          ),
        }));
        setCustomerTableData(array);
      }
    }
  }, [customerData.data, customerData.isSuccess]);

  useEffect(() => {
    if (loader) {
      dispatch(getAllCustomer());
      setLoader(false);
    } else {
      setLoader(false);
    }
  }, [deleteCustomerData?.data]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl mb-3">Customers</h1>
          <AppButton
            name={"New Customer"}
            onClick={() => {
              setVisible(true);
            }}
          />
        </div>

        <hr className="border-t border-gray-300" />
      </div>

      <div>
        <AppTable columns={columns} data={customerTableData} />
      </div>

      {visible && (
        <ModalCustomerAddUpdate
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}

      {editModalVisible && (
        <ModalCustomerAddUpdate
          visible={editModalVisible}
          onClose={() => {
            setEditModalVisible(false);
          }}
          edit={true}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
}
