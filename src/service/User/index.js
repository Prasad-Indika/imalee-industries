import { getAllUsersFromDB, saveUserToDB } from "@/actions/userActions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveUser = createAsyncThunk(
    'user/addUser',
    async (user) => {
        const response = await saveUserToDB(user);
        return response.data;
    }
);

export const getAllUsers = createAsyncThunk(
    'user/getAll',
    async () => {
        const response = await getAllUsersFromDB();
        return response.data;
    }
);