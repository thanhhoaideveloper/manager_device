import departmentApi from '../../apis/departmentApi';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notify from "../../utils/notification";

const initialState = {
    departments: []
}

export const fetchDepartment = createAsyncThunk(
    "departments",
    async () => {
        const data = await departmentApi.getListDepartment();
        return data;
    }
)

export const create = createAsyncThunk(
    "departments",
    async (body) => {
        try {
            await departmentApi.create(body);
            notify.success('Thêm thành công')
        } catch (e){
            console.error(`ERROR : ${e}`)
            notify.error('Thêm thất bại')
        }
    }
)

export const update = createAsyncThunk(
    "departments",
    async (body) => {
        try {
            await departmentApi.update(body);
            notify.success('Sửa thành công')
        } catch (e){
            console.error(`ERROR : ${e}`)
            notify.error('Sửa thất bại')
        }
    }
)

export const deleted = createAsyncThunk(
    "departments",
    async (body) => {
        try {
            await departmentApi.deleteApi(body);
            notify.success('Xóa thành công')
        } catch (e){
            console.error(`ERROR : ${e}`)
            notify.error('Xóa thất bại')
        }
    }
)

const users = createSlice({
    name: "departments",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchDepartment.fulfilled, (state, action) => {
            state.departments = action.payload;
        })
    }
})

export default users.reducer;