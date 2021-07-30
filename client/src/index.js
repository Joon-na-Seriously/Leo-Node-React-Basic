import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import 'antd/dist/antd.css';

// 그냥 store는 객체밖에 못받기 때문에 promise와 function도 받을 수 있게 middleware와 함께 만들어준다 
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider 
    store = { createStoreWithMiddleware(Reducer, 
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
            // chrome extension인 redux devtools를 이용하기 위해서 넣어줌
            // 여기까지 하면 App에 Redux를 연결 시킨 것
      )}
  >
    <App />
  </Provider>

  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
