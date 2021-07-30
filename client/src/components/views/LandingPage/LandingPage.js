import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {

    // LandingPage에 들어오자마자 이걸 실행해라
    useEffect(() => {
        // get Request를 서버에 보냄 << end point는 'api/hello'
        axios.get('/api/hello')
        .then(response => console.log(response.data))
        // server에서 돌아오는 response를 console.log에 

    }, [])

    return (
        <div style = {{ display : 'flex', justifyContent : 'center', alignItems: 'center', width : '100%', height: '100vh'}}>
            <h2>시작 페이지</h2>
        </div>
    )
}

export default LandingPage;