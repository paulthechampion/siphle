import axios from "axios"
import {FETCH_USER, FETCH_HOME,FETCH_NEARBY,FETCH_USERINFO} from "./types"



export const fetchUser =() => async dispatch =>{
     const res = await axios.get("/auth/api/current_user")
     dispatch({type:FETCH_USER, payload:res.data})
}

export const signIn = (values,history) => async dispatch =>{
     const res = await axios.post("/auth/signin",values)
     history.push("/home")
     dispatch({type:FETCH_USER, payload:res.data})
}

export const signUp = (values,history) => async dispatch =>{
     const res = await axios.post("/auth/signup",values)
     history.push("/add-info")
     dispatch({type:FETCH_USER, payload:res.data})
}
export const csrfIn = () => async dispatch =>{
     const res = await axios.get("/auth/signin")
     dispatch({type:FETCH_USER, payload:res.data})
}

export const csrfUp = () => async dispatch =>{
     const res = await axios.get("/auth/signup")
     dispatch({type:FETCH_USER, payload:res.data})
}



export const addInfo = (values,history) => async dispatch =>{
     const res = await axios.put("/auth/add-info",values)
     history.push("/location")
     dispatch({type:FETCH_USER, payload:res.data})
}

export const addLocation = (values,history) => async dispatch =>{
     const res = await axios.put("/auth/location",values)
     history.push("/home")
     dispatch({type:FETCH_USER, payload:res.data})
}

export const getHome = () => async dispatch =>{
     const res = await axios.get("/home")
     console.log("home")
     dispatch({type:FETCH_HOME, payload:res.data})
}

export const fetchNearby = () => async dispatch =>{
     const res = await axios.get("/home/nearby")

     dispatch({type: FETCH_NEARBY, payload: res.data})
}

export const fetchUserInfo = () => async dispatch =>{
     const res = await axios.get("/home/userinfo")
     dispatch({type: FETCH_USERINFO, payload: res.data})
}