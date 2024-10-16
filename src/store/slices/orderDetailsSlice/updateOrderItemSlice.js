import { createSlice } from "@reduxjs/toolkit";
import { updateOrderItem } from "@/service/OrderDetails";

const initialState = {
    orderDetail: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const updateOrderItemSlice = createSlice({
    name:'updateOrderDetails',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(updateOrderItem.pending, (state) => {
                state.orderDetail.isLoading = true;
                console.log("Loading..");
            })
            .addCase(updateOrderItem.fulfilled, (state, action) => {
                state.orderDetail.isLoading = false;
                state.orderDetail.isSuccess = true;
                state.orderDetail.data = action.payload;
                console.log("Fullfill",action.payload);
                
            })
            .addCase(updateOrderItem.rejected, (state, action) => {
                state.orderDetail.isLoading = false;
                state.orderDetail.isSuccess = false;
                state.orderDetail.errorMessage = action.error.message;
                console.log("Reject",action.error.message);
            });
    }

})

export default updateOrderItemSlice.reducer;