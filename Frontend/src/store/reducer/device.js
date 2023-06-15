import deviceApi from '../../apis/device';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import notify from "../../utils/notification";

const initialState = {
    devices: []
}

export const fetchDevice = createAsyncThunk(
    "devices",
    async () => {
        const data = await deviceApi.getListDevice();
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
    "devices",
    async (body) => {
        try {
            const data = await deviceApi.create(body);
            notify.success('Thêm thành công')
        } catch (e){
            console.error(`ERROR : ${e}`)
            notify.error('Thêm thất bại')
        }
    }
)

export const update = createAsyncThunk(
    "devices",
    async (body) => {
        try {
            const data = await deviceApi.update(body);
            notify.success('Sửa thành công')
        } catch (e){
            console.error(`ERROR : ${e}`)
            notify.error('Sửa thất bại')
        }
    }
)

export const deleteApi = createAsyncThunk(
    "devices",
    async (body) => {
        try {
            const data = await deviceApi.deleteApi(body);
            notify.success('Xóa thành công')
        } catch (e){
            console.error(`ERROR : ${e}`)
            notify.error('Xóa thất bại')
        }
    }
)

const users = createSlice({
    name: "devices",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchDevice.fulfilled, (state, action) => {
            state.devices = action.payload;
        })
    }
})

export default users.reducer;