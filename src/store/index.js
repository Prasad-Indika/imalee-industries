'use client'

import { configureStore } from "@reduxjs/toolkit"
import addUserSlice from "./slices/userSlice/addUserSlice"
import usersSlice from "./slices/userSlice/usersSlice"
import saveCustomerSlice from "./slices/customerSlice/saveCustomerSlice"
import customersSlice from "./slices/customerSlice/customersSlice"
import updateCustomerSlice from "./slices/customerSlice/updateCustomerSlice"
import deleteCustomerSlice from "./slices/customerSlice/deleteCustomerSlice"
import saveProductSlice from "./slices/productSlice/saveProductSlice"
import productSlice from "./slices/productSlice/productSlice"
import deleteProductSlice from "./slices/productSlice/deleteProductSlice"
import updateProductSlice from "./slices/productSlice/updateProductSlice"
import saveOrderSlice from "./slices/orderSlice/saveOrderSlice"
import saveOrderDetailSlice from "./slices/orderDetailsSlice/saveOrderDetailSlice"
import orderSlice from "./slices/orderSlice/orderSlice"
import pendingOrdersSlice from "./slices/orderSlice/pendingOrdersSlice"
import completeOrdersSlice from "./slices/orderSlice/completeOrdersSlice"
import orderItemsByOrderSlice from "./slices/orderDetailsSlice/orderItemsByOrderSlice"
import updateOrderItemSlice from "./slices/orderDetailsSlice/updateOrderItemSlice"
import updateOrderItemStatusSlice from "./slices/orderDetailsSlice/updateOrderItemStatusSlice"
import deleteOrderItemSlice from "./slices/orderDetailsSlice/deleteOrderItemSlice"
import updateOrderCompleteSlice from "./slices/orderSlice/updateOrderCompleteSlice"
import orderByIdSlice from "./slices/orderSlice/orderByIdSlice"

export const store = configureStore({
    reducer: {
        addUserSlice,
        usersSlice,
        saveCustomerSlice,
        customersSlice,
        updateCustomerSlice,
        deleteCustomerSlice,

        saveProductSlice,
        productSlice,
        deleteProductSlice,
        updateProductSlice,

        saveOrderSlice,
        orderSlice,
        pendingOrdersSlice,
        completeOrdersSlice,
        updateOrderCompleteSlice,
        orderByIdSlice,

        saveOrderDetailSlice,
        orderItemsByOrderSlice,
        updateOrderItemSlice,
        updateOrderItemStatusSlice,
        deleteOrderItemSlice,
    },
})