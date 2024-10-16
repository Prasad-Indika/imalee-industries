import { createSlice } from "@reduxjs/toolkit";
import { updateCustomer } from "@/service/Customer";

const initialState = {
    customer: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const updateCustomerSlice = createSlice({
    name:'updateCustomer',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(updateCustomer.pending, (state) => {
                state.customer.isLoading = true;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = true;
                state.customer.data = action.payload;
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = false;
                state.customer.errorMessage = action.error.message;
            });
    }


})

export default updateCustomerSlice.reducer;