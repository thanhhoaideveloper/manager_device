import userApi from '../../apis/userApi';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notify from "../../utils/notification";


const initialState = {
    users: []
}

export const fetchUser = createAsyncThunk(
    "users",
    async () => {
        const data = await userApi.getListUser();
        return data;
    }
)

export const createUser = createAsyncThunk(
    'users/create',
    async (formData, thunkApi) => {
        try{
            const data = await userApi.createUser(formData);
            notify.success('Thêm thành công')
            return data;
        }catch(err){
            thunkApi.rejectWithValue(err.response.message);
            notify.error('Thêm thất bại')
        }
    }
)

export const updateUser = createAsyncThunk(
    'users/update',
    async ({id, formData}, thunkApi) => {
        try{
            const data = await userApi.updateUser(id, formData);
            notify.success('Sửa thành công')
            return data;
        }catch(err){
            thunkApi.rejectWithValue(err.response.message);
            notify.error('Sửa thất bại')
        }
    }
)

const users = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.users.push(action.payload);
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.users = state.users.map(item => {
                if(item.id === action.payload.id){
                    return action.payload
                }
                return item;
            })
        })
    }
})

export default users.reducer;