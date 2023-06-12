import categoryApi from '../../apis/categoryApi';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notify from "../../utils/notification";
import _ from 'lodash';

const initialState = {
    categoryApi: []
}

export const fetchCategory = createAsyncThunk(
    "categoryApi",
    async () => {
        const data = await categoryApi.getListCategories();
        let index = 1;
        let list = [];
        if(_.size(data) > 0){
            list = data.map((item) => {
                let _item = {index: index, ...item}
                index++;
                return _item;
            })
        };
        return list;
    }
)

export const create = createAsyncThunk(
    "categoryApi",
    async (body) => {
        try {
            const data = await categoryApi.create(body);
            notify.success('Thêm thành công')
        } catch (e){
            console.error(`ERROR : ${e}`)
            notify.error('Thêm thất bại')
        }
    }
)

export const update = createAsyncThunk(
    "categoryApi",
    async (body) => {
        try {
            const data = await categoryApi.update(body);
            notify.success('Sửa thành công')
        } catch (e){
            console.error(`ERROR : ${e}`)
            notify.error('Sửa thất bại')
        }
    }
)

export const deleteApi = createAsyncThunk(
    "categoryApi",
    async (body) => {
        try {
            const data = await categoryApi.deleteApi(body);
            notify.success('Xóa thành công')
        } catch (e){
            console.error(`ERROR : ${e}`)
            notify.error('Xóa thất bại')
        }
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