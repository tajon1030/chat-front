import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login, loginPostAsync } from "../redux/loginSlice";

const initState = {
    id: '',
    password: ''
}
const LoginPage = () => {
    const [loginParam, setLoginParam] = useState({...initState});

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
                // 토큰값을 cookie에 저장하여 추후 api호출시 헤더정보에 토큰값을 담아 보내도록 한다.
                
                Navigate({pathname:'/room'}, {replace:true})
            }
        })
    }

    return ( 
        <div>
            <div>
                <p><span>id:</span>
                    <input type="text" name="id" value={loginParam.id} onChange={handleChange}></input>
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