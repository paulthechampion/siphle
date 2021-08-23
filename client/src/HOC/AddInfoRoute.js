import React,{useState,useEffect} from 'react'
import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import * as actions from "../actions"

 function AddInfoRoute({component:Component, auth,...rest}) {
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch("auth/api/current_user")
        .then(response => response.json())
        .then(json => setData(json))
    },[])
    function renderContent(){
        switch(data){
            case null:
                return
            
            case false:
               return <Route {...rest} render={props=>{
                        return <Redirect to={{pathname:"/signin", 
                                            state:{from:props.location}}}/>
                }}/>
                
            
            default:
                return <Route {...rest} render={props=>{
                    
                    return data.birthday?<Redirect to={{pathname:"/home", 
                    state:{from:props.location}}}/>:<Component {...props}/>
                    
                }}/>

        }
    }
   
    return(
        <div>
        {renderContent()}
        </div>
    )
}
function mapStateToprops({auth}){
    return {auth}
}
export default connect(mapStateToprops,actions)(AddInfoRoute)