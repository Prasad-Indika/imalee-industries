import { deleteCustomerFromDB, getAllCustomersFromDB, savecustomerToDB, updateCustomerFromDB } from "@/actions/customerActions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveCustomer = createAsyncThunk(
    'customer/addCustomer',
    async (customer) => {
        const response = await savecustomerToDB(customer);
        return response.data;
    }
);

export const getAllCustomer = createAsyncThunk(
    'customer/getAll',
    async () => {
        const response = await getAllCustomersFromDB();
        return response.data;
    }
);

export const updateCustomer = createAsyncThunk(
    'customer/update',
    async ({id,updateCustomer}) => {
        const response = await updateCustomerFromDB(id,updateCustomer);
        return response.data;
    }
);

export const deleteCustomer = createAsyncThunk(
    'customer/delete',
    async (id) => {
        const response = await deleteCustomerFromDB(id);
        return response.data;
    }
);