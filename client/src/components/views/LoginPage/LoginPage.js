import React, {useState} from 'react'
import Axios from 'axios';
import {useDispatch} from 'react-redux';
// dispatch를 이용해서 action을 짜는 것
import {loginUser} from '../../../_actions/user_action';
import RegisterPage from '../RegisterPage/RegisterPage';

function LoginPage(props) {
    // data를 받을 떄는 state을 변화시켜서 data들을 변화 시켜줌 
    // email, password를 위한 state 2개를 만들어주어야 함
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("")

    const dispatch = useDispatch();

    const onEmailHandler = (event) => {
        // setEmail로 state을 바꾸어줄 수 있다
        // 현재 change된 event에 들어간  value로 email의 state을 바꾸어 준다
        setEmail(event.currentTarget.value)
    } 
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        // default를 막지 않으면 매번 누를 때마다 page가 refresh 됨 -> submit을 할 수가 없다
        event.preventDefault();

        let body = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess){
                    // react에서 page 이동을 시킬 때는 이렇게 함 
                    props.history.push('/');
                } else {
                    alert("Error");
                }
            })
    }

    return (


        <div style = {{ display : 'flex', justifyContent : 'center', alignItems: 'center', width : '100%', height: '100vh'}}
            onSubmit = {onSubmitHandler}
        >
            <form style= {{display: 'flex', flexDirection: 'column'}}>
                <label>Email</label>
                <input type="email" value = {Email} onChange = {onEmailHandler} />
                <label>Password</label>
                <input type="password" value = {Password} onChange = {onPasswordHandler} />
                <br />
                <button>
                    login
                </button>
            </form>
        </div>


    )
}

export default LoginPage
