// login 기능이나 register 기능

import { LOGIN_USER } from "../_actions/types";

// 전 state과 현재 action을 다음 state로 돌려주어야 함
export default function (state = {}, action) {
    // state는 일단 비어있는 상태
    switch (action.type){
        case LOGIN_USER:
            // payload를 loginSuccess에다가 넣어줌
            return {...state, loginSuccess : action.payload };
            
            
            break;
        
        default: 
            return state;
    }
}