import { saveOrderItemToDB } from "@/actions/orderDetailsAction";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveOrderItem = createAsyncThunk(
    'orderItem/save',
    async ({orderId,orderDetails}) => {
        const response = await saveOrderItemToDB(orderId,orderDetails);
        return response.data;
    }
);