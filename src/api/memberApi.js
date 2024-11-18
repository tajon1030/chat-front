import axios from "axios";
import { API_SERVER_HOST } from "./chat";

const prefix = `${API_SERVER_HOST}/member`;

export const loginPost = async (loginParam) => {
    
    const header = {headers: {'Content-Type':'x-www-form-urlencoded'}}
    const form = new FormData();
    form.append('username',loginParam.username);
    form.append('password',loginParam.pw);

    const res = await axios.post(`${prefix}/login`, form, header)

    return res.data
};
