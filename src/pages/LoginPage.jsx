import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, loginPostAsync } from "../redux/loginSlice";
import { setCookie } from "../util/cookieUtil";

const initState = {
    username: '',
    password: ''
}
const LoginPage = () => {
    const [loginParam, setLoginParam] = useState({...initState});
    const navigate = useNavigate();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value;
        setLoginParam({...loginParam});
    }

    const dispatch = useDispatch();
    const handleClickLogin = (e) => {
        dispatch(login(loginParam));
        dispatch(loginPostAsync(loginParam))
        .unwrap()
        .then(data => {
            if(data.error){
                alert("로그인 오류")
            }else {
                alert("로그인성공");
                saveAsCookie(data.response)
                navigate({pathname:'/room'}, {replace:true})
            }
        })
    }
    const saveAsCookie = (data) => {
        setCookie('member', JSON.stringify(data), 1); // 로그인내역 하루 저장
    }

    return ( 
        <div>
            <div>
                <p><span>id:</span>
                    <input type="text" name="username" value={loginParam.username} onChange={handleChange}></input>
                </p>
                <p><span>pw:</span>
                    <input type="password" name="password" value={loginParam.password} onChange={handleChange}></input>
                </p>
            </div>
            <div>
                <button onClick={handleClickLogin}>login</button>
            </div>
        </div>
    );
}
 
export default LoginPage;