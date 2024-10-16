import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "@/service/User";

const initialState = {
    user: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const usersSlice = createSlice({
    name:'allUsers',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.user.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.user.isLoading = false;
                state.user.isSuccess = true;
                state.user.data = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.user.isLoading = false;
                state.user.isSuccess = false;
                state.user.errorMessage = action.error.message;
            });
    }


})

export default usersSlice.reducer;