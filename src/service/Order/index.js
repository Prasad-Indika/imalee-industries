import { getAllOrdersFromDB, getCompleteOrdersFromDB, getOrderByIdFromDB, getPendingOrdersFromDB, saveOrderToDB, updateOrderCompleteToDB } from "@/actions/orderActions";
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

export const updateOrderComplete = createAsyncThunk(
    'orders/update',
    async ({orderId,updateOrder}) => {
        const response = await updateOrderCompleteToDB(orderId,updateOrder);
        return response.data;
    }
);

export const getOrderById = createAsyncThunk(
    'orders/getOrderById',
    async (orderId) => {
        const response = await getOrderByIdFromDB(orderId);
        return response.data;
    }
);