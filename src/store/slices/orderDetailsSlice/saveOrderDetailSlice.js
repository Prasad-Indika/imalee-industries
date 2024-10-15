import { createSlice } from "@reduxjs/toolkit";
import { saveOrderItem } from "@/service/OrderDetails";

const initialState = {
    orderDetail: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const saveOrderDetailsSlice = createSlice({
    name:'saveOrderDetails',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(saveOrderItem.pending, (state) => {
                state.orderDetail.isLoading = true;
                console.log("Loading..");
            })
            .addCase(saveOrderItem.fulfilled, (state, action) => {
                state.orderDetail.isLoading = false;
                state.orderDetail.isSuccess = true;
                state.orderDetail.data = action.payload;
                console.log("Fullfill",action.payload);
                
            })
            .addCase(saveOrderItem.rejected, (state, action) => {
                state.orderDetail.isLoading = false;
                state.orderDetail.isSuccess = false;
                state.orderDetail.errorMessage = action.error.message;
                console.log("Reject",action.error.message);
            });
    }

})

export default saveOrderDetailsSlice.reducer;