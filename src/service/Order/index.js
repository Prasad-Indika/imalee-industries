import { saveOrderToDB } from "@/actions/orderActions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveOrder = createAsyncThunk(
    'order/save',
    async ({customer,order}) => {
        const response = await saveOrderToDB(customer,order);
        return response.data;
    }
);