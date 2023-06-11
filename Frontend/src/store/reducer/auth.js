import userApi from '../../apis/userApi';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    currentUser: null
}

export const getCurrentUser = createAsyncThunk(
    "users",
    async () => {
        const data = await userApi.getListUser();
        return data;
    }
)

const users = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.users = action.payload;
        })
    }
})

export default users.reducer;