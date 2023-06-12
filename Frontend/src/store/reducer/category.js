import categoryApi from '../../apis/categoryApi';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryApi: []
}

export const fetchCategory = createAsyncThunk(
    "categoryApi",
    async () => {
        const data = await categoryApi.getListCategories();
        return data;
    }
)

const category = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.categoryApi = action.payload;
        })
    }
})

export default category.reducer;