import { createSlice } from "@reduxjs/toolkit";
import { saveProduct } from "@/service/Product";

const initialState = {
    product: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const saveProductSlice = createSlice({
    name:'saveProduct',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(saveProduct.pending, (state) => {
                state.product.isLoading = true;
                console.log("Loading..");
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.product.isLoading = false;
                state.product.isSuccess = true;
                state.product.data = action.payload;
                console.log("Fullfill",action.payload);
                
            })
            .addCase(saveProduct.rejected, (state, action) => {
                state.product.isLoading = false;
                state.product.isSuccess = false;
                state.product.errorMessage = action.error.message;
            });
    }


})

export default saveProductSlice.reducer;