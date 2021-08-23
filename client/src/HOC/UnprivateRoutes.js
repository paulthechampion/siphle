import React,{useContext,useState,useEffect} from 'react'
import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import * as actions from "../actions"



 function UnPrivateRoute({component:Component, auth,user,...rest}) {
     function renderContent(){
        switch(auth){
            case null:
                return
            
            case false:
               return <Route {...rest} render={props=>{
                        return <Component {...props}/>
                }}/>
                
            
            default:
                return <Route {...rest} render={props=>{
                    return <Redirect to={{pathname:"/home", 
                    state:{from:props.location}}}/>
                }}/>

        }
    }
    //console.log(user)
    return(
        <div>
        {renderContent()}
        </div>
    )
}

function mapStateToprops({auth}){
    return {auth}
}
export default connect(mapStateToprops,actions)(UnPrivateRoute)