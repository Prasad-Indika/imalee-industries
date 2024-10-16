import { createSlice } from "@reduxjs/toolkit";
import { getAllCustomer } from "@/service/Customer";

const initialState = {
    customer: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const customersSlice = createSlice({
    name:'allCustomer',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCustomer.pending, (state) => {
                state.customer.isLoading = true;
            })
            .addCase(getAllCustomer.fulfilled, (state, action) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = true;
                state.customer.data = action.payload;  
            })
            .addCase(getAllCustomer.rejected, (state, action) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = false;
                state.customer.errorMessage = action.error.message;
            });
    }


})

export default customersSlice.reducer;