import { createSlice } from "@reduxjs/toolkit";
import { updateOrderComplete } from "@/service/Order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const updateOrderCompleteSlice = createSlice({
    name:'updateOrder',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(updateOrderComplete.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(updateOrderComplete.fulfilled, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = action.payload;
            })
            .addCase(updateOrderComplete.rejected, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = action.error.message;
            });
    }
})

export default updateOrderCompleteSlice.reducer;