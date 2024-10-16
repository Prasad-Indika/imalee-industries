import { createSlice } from "@reduxjs/toolkit";
import { updateOrderItemStatus } from "@/service/OrderDetails";

const initialState = {
    orderDetail: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const updateOrderItemStatusSlice = createSlice({
    name:'updateOrderDetailsStatus',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(updateOrderItemStatus.pending, (state) => {
                state.orderDetail.isLoading = true;
                console.log("Loading..");
            })
            .addCase(updateOrderItemStatus.fulfilled, (state, action) => {
                state.orderDetail.isLoading = false;
                state.orderDetail.isSuccess = true;
                state.orderDetail.data = action.payload;
                console.log("Fullfill",action.payload);
                
            })
            .addCase(updateOrderItemStatus.rejected, (state, action) => {
                state.orderDetail.isLoading = false;
                state.orderDetail.isSuccess = false;
                state.orderDetail.errorMessage = action.error.message;
                console.log("Reject",action.error.message);
            });
    }

})

export default updateOrderItemStatusSlice.reducer;