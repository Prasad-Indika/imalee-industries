import { createSlice } from "@reduxjs/toolkit";
import { updateProduct } from "@/service/Product";

const initialState = {
    product: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const updateProductSlice = createSlice({
    name:'updateProduct',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(updateProduct.pending, (state) => {
                state.product.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.product.isLoading = false;
                state.product.isSuccess = true;
                state.product.data = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.product.isLoading = false;
                state.product.isSuccess = false;
                state.product.errorMessage = action.error.message;
            });
    }


})

export default updateProductSlice.reducer;