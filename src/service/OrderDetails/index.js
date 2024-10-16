
import { deleteOrderItemFromDB, getItemsByOrderFromDB, saveOrderItemToDB, updateOrderItemStatusToDB, updateOrderItemToDB } from "@/actions/orderDetailsActions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveOrderItem = createAsyncThunk(
    'orderItem/save',
    async ({order,orderitem}) => {
        const response = await saveOrderItemToDB(order,orderitem);
        return response.data;
    }
);

export const updateOrderItem = createAsyncThunk(
    'orderItem/update',
    async ({orderItemId,updateditem}) => {
        const response = await updateOrderItemToDB(orderItemId,updateditem);
        return response.data;
    }
);

export const updateOrderItemStatus = createAsyncThunk(
    'orderItem/updateStatus',
    async (orderItemId) => {
        const response = await updateOrderItemStatusToDB(orderItemId);
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

export const deleteOrderItem = createAsyncThunk(
    'orderItem/delete',
    async ({orderItemId,orderId}) => {
        const response = await deleteOrderItemFromDB(orderItemId,orderId);
        return response.data;
    }
);