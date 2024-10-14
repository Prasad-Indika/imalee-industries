import { createSlice } from "@reduxjs/toolkit";
import { saveOrder } from "@/service/Order";

const initialState = {
    order: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const saveOrderSlice = createSlice({
    name:'saveOrder',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(saveOrder.pending, (state) => {
                state.order.isLoading = true;
                console.log("Loading..");
            })
            .addCase(saveOrder.fulfilled, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = true;
                state.order.data = action.payload;
                console.log("Fullfill",action.payload);
                
            })
            .addCase(saveOrder.rejected, (state, action) => {
                state.order.isLoading = false;
                state.order.isSuccess = false;
                state.order.errorMessage = action.error.message;
            });
    }


})

export default saveOrderSlice.reducer;