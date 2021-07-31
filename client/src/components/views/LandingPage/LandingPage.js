import React, { useEffect } from 'react';
import axios from 'axios';
// import { response } from 'express';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {

    // LandingPage에 들어오자마자 이걸 실행해라
    useEffect(() => {
        // get Request를 서버에 보냄 << end point는 'api/hello'
        axios.get('/api/hello')
        .then(response => console.log(response.data))
        // server에서 돌아오는 response를 console.log에 

    }, [])

    const onClickHandler = () =>{
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success){
                    props.history.push("/login");
                } else {
                    alert("로그아웃에 실패했당께");
                }
            });
    }

    return (
        <div style = {{ display : 'flex', justifyContent : 'center', alignItems: 'center', width : '100%', height: '100vh'}}>
            <h2>시작 페이지</h2>

            <button onClick = {onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage);