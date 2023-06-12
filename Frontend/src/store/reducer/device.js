import deviceApi from '../../apis/device';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

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