import {combineReducers} from "redux"
import authReducer from "./authReducer"
import homeReducer from "./homeReducer"
import nearbyReducer from "./nearbyReducer"
import userInfoReducer from "./userInfoReducer"
import{reducer as reduxForm} from "redux-form"

export default combineReducers({
    auth: authReducer,
    form:reduxForm,
    home: homeReducer,
    nearby :nearbyReducer,
    userInfo:userInfoReducer
})