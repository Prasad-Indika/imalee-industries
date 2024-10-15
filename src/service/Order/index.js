import { getAllOrdersFromDB, getCompleteOrdersFromDB, getPendingOrdersFromDB, saveOrderToDB } from "@/actions/orderActions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveOrder = createAsyncThunk(
    'order/save',
    async ({customer,order}) => {
        const response = await saveOrderToDB(customer,order);
        return response.data;
    }
);

export const getAllOrders = createAsyncThunk(
    'orders/getAll',
    async () => {
        const response = await getAllOrdersFromDB();
        return response.data;
    }
);

export const getPendingOrders = createAsyncThunk(
    'orders/getPending',
    async () => {
        const response = await getPendingOrdersFromDB();
        return response.data;
    }
);

export const getCompleteOrders = createAsyncThunk(
    'orders/getComplete',
    async () => {
        const response = await getCompleteOrdersFromDB();
        return response.data;
    }
);