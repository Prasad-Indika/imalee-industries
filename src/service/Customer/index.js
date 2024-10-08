import { getAllCustomersFromDB, savecustomerToDB } from "@/actions/customerActions";
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