import { createSlice } from "@reduxjs/toolkit";
import { getCompleteOrders } from "@/service/Order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const completeOrdersSlice = createSlice({
    name:'completeOrders',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getCompleteOrders.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(getCompleteOrders.fulfilled, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = action.payload; 
            })
            .addCase(getCompleteOrders.rejected, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = action.error.message;
            });
    }


})

export default completeOrdersSlice.reducer;