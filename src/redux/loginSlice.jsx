import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
    id: ''
}

const loadMemberCookie = () => {
    const memberInfo = getCookie("member");
    return memberInfo;
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            // 쿠키에 소셜로그인해서 받아온 값 저장
            setCookie('member', JSON.stringify(action.payload), 1);
            // 앞으로 유지해야하는 데이터 리턴
            return action.payload.response;
        },
        logout: () => {
            // 로그아웃시 쿠키 제거
            removeCookie('member');
            return {...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            const payload = action.payload;
            if(payload.success){
                setCookie("member", JSON.stringify(payload.response), 1); // 로그인내역 하루 저장
            }
            // 리듀서이기때문에 리턴하는값이 다음상태로 유지
            return payload.response
        })
    }
});

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => loginPost(param));

export const {login} = loginSlice.actions;
export default loginSlice.reducer;