import authApi from '../../apis/authApi';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { setLocalStrorage, getLocalStorage, removeLocalStorage } from '../../utils';

const initialState = {
    isAuthenticated: getLocalStorage('isAuthenticated'),
    currentUser: getLocalStorage('currentUser'),
    message: null
}

export const login = createAsyncThunk(
    "users/logins",
    async ({email, password}, thunkApi) => {
        try{
            const data = await authApi.login(email, password);
            setLocalStrorage(data.user);
            return data;
        }catch(err){
            if (!err.response) {
                throw err
              }
            return thunkApi.rejectWithValue(err.response.data)
        }   
      
    }
)

const auth = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.users;
            state.isAuthenticated = true;
        })
        .addCase(login.rejected, (state, action) => {
            state.message = action.payload.message;
        })
    },
    reducers: {
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.currentUser = null;
            removeLocalStorage();
        }
    }
})

export default auth.reducer;
export const { logout } = auth.actions;