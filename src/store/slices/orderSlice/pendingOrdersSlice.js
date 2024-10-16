import { createSlice } from "@reduxjs/toolkit";
import { getPendingOrders } from "@/service/Order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const pendingOrdersSlice = createSlice({
    name:'pendingOrders',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getPendingOrders.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(getPendingOrders.fulfilled, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = action.payload;
            })
            .addCase(getPendingOrders.rejected, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = action.error.message;
            });
    }
})

export default pendingOrdersSlice.reducer;