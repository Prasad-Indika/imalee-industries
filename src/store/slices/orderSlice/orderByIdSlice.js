import { createSlice } from "@reduxjs/toolkit";
import { getOrderById } from "@/service/Order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const orderByIdSlice = createSlice({
    name:'orderById',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderById.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = action.error.message;
            });
    }

})

export default orderByIdSlice.reducer;