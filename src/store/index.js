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
        updateProductSlice
    },
})