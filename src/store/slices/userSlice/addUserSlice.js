import { createSlice } from "@reduxjs/toolkit";
import { saveUser } from "@/service/User";

const initialState = {
    user: {
        data: [],
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
    },
}

const addUserSlice = createSlice({
    name:'addUser',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(saveUser.pending, (state) => {
                state.user.isLoading = true;
                console.log("Loading..");
            })
            .addCase(saveUser.fulfilled, (state, action) => {
                state.user.isLoading = false;
                state.user.isSuccess = true;
                state.user.data = action.payload;
                console.log("Fullfill",action.payload);
                
            })
            .addCase(saveUser.rejected, (state, action) => {
                state.user.isLoading = false;
                state.user.isSuccess = false;
                state.user.errorMessage = action.error.message;
            });
    }


})

export default addUserSlice.reducer;