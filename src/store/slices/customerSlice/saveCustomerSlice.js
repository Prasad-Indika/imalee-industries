import { createSlice } from "@reduxjs/toolkit";
import { saveCustomer } from "@/service/Customer";

const initialState = {
    customer: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const saveCustomerSlice = createSlice({
    name:'saveCustomer',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(saveCustomer.pending, (state) => {
                state.customer.isLoading = true;   
            })
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = true;
                state.customer.data = action.payload;         
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                state.customer.isLoading = false;
                state.customer.isSuccess = false;
                state.customer.errorMessage = action.error.message;
            });
    }


})

export default saveCustomerSlice.reducer;