import { deleteProductFromDB, getAllProductsFromDB, saveProductToDB, updateProductFromDB } from "@/actions/productActions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveProduct = createAsyncThunk(
    'product/save',
    async (product) => {
        const response = await saveProductToDB(product);
        return response.data;
    }
);

export const getAllProducts = createAsyncThunk(
    'product/getAll',
    async () => {
        const response = await getAllProductsFromDB();
        return response.data;
    }
);

export const updateProduct = createAsyncThunk(
    'product/update',
    async ({id,updateProduct}) => {
        const response = await updateProductFromDB(id,updateProduct);
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (id) => {
        const response = await deleteProductFromDB(id);
        return response.data;
    }
);