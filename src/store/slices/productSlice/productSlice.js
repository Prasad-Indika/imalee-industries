import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "@/service/Product";

const initialState = {
    product: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const productSlice = createSlice({
    name:'allProduct',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.product.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.product.isLoading = false;
                state.product.isSuccess = true;
                state.product.data = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.product.isLoading = false;
                state.product.isSuccess = false;
                state.product.errorMessage = action.error.message;
            });
    }


})

export default productSlice.reducer;