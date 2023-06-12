import deviceApi from '../../apis/device';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    devices: []
}

export const fetchDevice = createAsyncThunk(
    "devices",
    async () => {
        console.log('tets')
        const data = await deviceApi.getListDevice();
        return data;
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