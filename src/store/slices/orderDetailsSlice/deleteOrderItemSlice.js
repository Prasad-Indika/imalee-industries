import { createSlice } from "@reduxjs/toolkit";
import { deleteOrderItem } from "@/service/OrderDetails";

const initialState = {
    orderDetail: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const deleteOrderItemSlice = createSlice({
    name:'deleteOrderDetails',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(deleteOrderItem.pending, (state) => {
                state.orderDetail.isLoading = true;
                console.log("Loading..");
            })
            .addCase(deleteOrderItem.fulfilled, (state, action) => {
                state.orderDetail.isLoading = false;
                state.orderDetail.isSuccess = true;
                state.orderDetail.data = action.payload;
                console.log("Fullfill",action.payload);
            })
            .addCase(deleteOrderItem.rejected, (state, action) => {
                state.orderDetail.isLoading = false;
                state.orderDetail.isSuccess = false;
                state.orderDetail.errorMessage = action.error.message;
            });
    }

})

export default deleteOrderItemSlice.reducer;