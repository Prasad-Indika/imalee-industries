
import { getItemsByOrderFromDB, saveOrderItemToDB } from "@/actions/orderDetailsActions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveOrderItem = createAsyncThunk(
    'orderItem/save',
    async ({order,orderitem}) => {
        const response = await saveOrderItemToDB(order,orderitem);
        return response.data;
    }
);

export const getOrderItemByOrder = createAsyncThunk(
    'orderItem/byOrder',
    async (order) => {
        const response = await getItemsByOrderFromDB(order);
        return response.data;
    }
);