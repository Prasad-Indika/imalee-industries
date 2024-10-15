import { createSlice } from "@reduxjs/toolkit";
import { getOrderItemByOrder } from "@/service/OrderDetails";

const initialState = {
    orderDetail: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const orderItemsByOrderSlice = createSlice({
    name:'orderItemsByOrder',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderItemByOrder.pending, (state) => {
                state.orderDetail.isLoading = true;
                console.log("Loading..");
            })
            .addCase(getOrderItemByOrder.fulfilled, (state, action) => {
                state.orderDetail.isLoading = false;
                state.orderDetail.isSuccess = true;
                state.orderDetail.data = action.payload;
                console.log("Fullfill",action.payload);
                
            })
            .addCase(getOrderItemByOrder.rejected, (state, action) => {
                state.orderDetail.isLoading = false;
                state.orderDetail.isSuccess = false;
                state.orderDetail.errorMessage = action.error.message;
                console.log("Reject",action.error.message);
            });
    }

})

export default orderItemsByOrderSlice.reducer;