import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
    // SpecificComponent: HOC로 감싸질 하위 component
    // Option 
        // null: 아무나 출입이 가능한 page
        // true: login 한 유저만 출입이 가능한 page
        // false: login 한 유저는 출입 불가능한 page
    // AdminRoute
        // 입력이 없으면 default가 null로 지정함




    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        // Backend에 request를 날려서 현재 user의 상황을 알아야 함
        useEffect(() => {
            // redux 사용 -> dispatch를 날려야 함
            dispatch(auth()).then(response => {
                // backend에서 처리한 정보들이 이 response에 담겨있을 것.
                console.log(response);

                // login하지 않은 상태 -> option 이 true인 경우에는 접근할 수 없어야 함
                if (!response.payload.isAuth){
                    if (option) {
                        props.history.push('/login');
                    }
                }else {
                    // login 한 상태
                    if (adminRoute && !response.payload.isAdmin){
                        // isAdmin이 false인데, adminRoute가 true 인 곳에 접근하는 경우
                        console.log("권한 없는데 왜와")
                        props.history.push('/');
                    } else {
                        if (option === false){
                            console.log("로그인 했는데 왜와")
                            props.history.push('/');
                        }
                    }
                }
            });

        }, []) 
        return (
            <SpecificComponent />
        )
    }




    return AuthenticationCheck;
}