import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct } from "@/service/Product";

const initialState = {
    product: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const deleteProductSlice = createSlice({
    name:'deleteProduct',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.product.isLoading = true;
                console.log("Loading..");
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.product.isLoading = false;
                state.product.isSuccess = true;
                state.product.data = action.payload;
                console.log("Fullfill",action.payload);
                
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.product.isLoading = false;
                state.product.isSuccess = false;
                state.product.errorMessage = action.error.message;
            });
    }


})

export default deleteProductSlice.reducer;