import "materialize-css/dist/css/materialize.min.css"
import "react-datepicker/dist/react-datepicker.css"
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import reduxThunk from "redux-thunk"
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios"
import reducers from "./reducers"

window.axios = axios

const store = createStore(reducers,{},applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
