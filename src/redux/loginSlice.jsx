import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

const initState = {
    id: ''
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => loginPost(param));

export const {login} = loginSlice.actions;
export default loginSlice.reducer;