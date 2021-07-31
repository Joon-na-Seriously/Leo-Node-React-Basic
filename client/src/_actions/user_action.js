import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
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

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    };
};


export function auth() {
    // GET Method이니까 Body 부분은 필요가 없으므로 비워줌
    const request = axios.get('/api/users/auth')
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    };
};