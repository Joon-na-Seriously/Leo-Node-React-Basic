import { combineReducers } from "redux";
// combineReducers
// Store에 reducer들이 여러가지가 있을 수 있음
// Reducer안에서 하는 일이 state가 변하는 것을 보여준 다음에 변한 마지막 value를 return해주는게 reducer의 일
// 그러므로 User에 관한 state, subscribe에 관한 state 등 여러가지 state로 나누어져 있으므로 reducer도 여러가지
// 따라서 combineReducers로 root reducer로 하나로 합쳐주는 것 (관리하기 편하도록)

// import user from './user-reducer';

const rootReducer = combineReducers({
    // user, 

})

export default rootReducer; 