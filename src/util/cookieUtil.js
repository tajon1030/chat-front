import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 이름, 값, 몇일간 유지할것인지
export const setCookie = (name, value, days = 1) => {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);

    // 하위경로에서 다 사용할수있게 / 지정
    return cookies.set(name, value, {expires: expires, path: '/'})
}

export const getCookie = (name) => {
    return cookies.get(name);
}

export const removeCookie = (name, path = '/') => {
    cookies.remove(name, {path:path});
}