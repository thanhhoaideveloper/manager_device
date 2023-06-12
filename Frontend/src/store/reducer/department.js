import departmentApi from '../../apis/departmentApi';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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