import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
// dispatch를 이용해서 action을 짜는 것
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';


function RegisterPage(props) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    

    const dispatch = useDispatch();

    const onEmailHandler = (event) => {
        // setEmail로 state을 바꾸어줄 수 있다
        // 현재 change된 event에 들어간  value로 email의 state을 바꾸어 준다
        setEmail(event.currentTarget.value)
    } 
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    };


    const onSubmitHandler = (event) => {
        // default를 막지 않으면 매번 누를 때마다 page가 refresh 됨 -> submit을 할 수가 없다
        event.preventDefault();

        // pwd와 confirm pwd가 같아야 회원가입 버튼이 눌릴 수 있게 하기 위해서
        if (Password !== ConfirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다!");
        }


        let body = {
            email : Email,
            name : Name,
            password : Password   
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push('/login');
                } else {
                    alert("Failed to SignUp");
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
                <label>Name</label>
                <input type="text" value = {Name} onChange = {onNameHandler} />
                <label>Password</label>
                <input type="password" value = {Password} onChange = {onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value = {ConfirmPassword} onChange = {onConfirmPasswordHandler} />
                <br />
                <button>
                    Register
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage);
