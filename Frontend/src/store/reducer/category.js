import categoryApi from '../../apis/categoryApi';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: []
}

export const fetchCategory = createAsyncThunk(
    "categories",
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
            state.categories = action.payload;
        })
    }
})

export default category.reducer;