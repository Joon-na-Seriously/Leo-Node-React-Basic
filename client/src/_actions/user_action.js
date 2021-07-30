import axios from "axios";
import {
    LOGIN_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data );
    
    return {
        // reducer를 보내야함 => previous state과 action을 받아서 다음 state로 가야 하므로
        type: LOGIN_USER,
        payload: request
    }  
}