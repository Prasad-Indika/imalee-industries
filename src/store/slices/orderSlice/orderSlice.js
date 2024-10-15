import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "@/service/Order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const orderSlice = createSlice({
    name:'allOrders',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.order.isLoading = true;
                console.log("Loading..");
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = action.payload;
                console.log("Fullfill",action.payload);
                
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = action.error.message;
            });
    }


})

export default orderSlice.reducer;