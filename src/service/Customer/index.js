import { savecustomerToDB } from "@/actions/customerActions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveCustomer = createAsyncThunk(
    'customer/addCustomer',
    async (customer) => {
        const response = await savecustomerToDB(customer);
        return response.data;
    }
);