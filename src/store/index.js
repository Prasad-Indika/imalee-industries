'use client'

import { configureStore } from "@reduxjs/toolkit"
import addUserSlice from "./slices/userSlice/addUserSlice"
import usersSlice from "./slices/userSlice/usersSlice"
import saveCustomerSlice from "./slices/customerSlice/saveCustomerSlice"

export const store = configureStore({
    reducer: {
        addUserSlice,
        usersSlice,
        saveCustomerSlice
    },
})