import { createSlice } from "@reduxjs/toolkit";
import { deleteCustomer } from "@/service/Customer";

const initialState = {
    customer: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const deleteCustomerSlice = createSlice({
    name:'deleteCustomer',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(deleteCustomer.pending, (state) => {
                state.customer.isLoading = true;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = true;
                state.customer.data = action.payload;
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = false;
                state.customer.errorMessage = action.error.message;
            });
    }


})

export default deleteCustomerSlice.reducer;