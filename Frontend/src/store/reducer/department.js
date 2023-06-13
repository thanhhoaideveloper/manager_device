import departmentApi from '../../apis/departmentApi';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    departments: []
}

export const fetchDepartment = createAsyncThunk(
    "departments",
    async () => {
        console.log('datadata')
        const data = await departmentApi.getListDepartment();
        console.log('datadata',data)
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