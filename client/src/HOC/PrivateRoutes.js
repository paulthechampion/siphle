import React,{useContext,useEffect,useState,Component} from 'react'
import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"
// import {fetchUser} from "../actions"
import * as actions from "../actions"

function PrivateRoute({component:Component, auth,...rest}) {
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch("auth/api/current_user")
        .then(response => response.json())
        .then(json => setData(json))
    },[])
    function renderContent(){
        //console.log(data)
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
                    return data.birthday?<Component {...props}/>:<Redirect to={{pathname:"/add-info", 
                    state:{from:props.location}}}/>
                    
                }}/>

        }
    }
    
    return(
        <div>
       {renderContent()}
       </div>
    )
}

// class PrivateRoute extends Component{
//     componentDidMount(){
//         this.props.fetchUser()
//     }
//     //const [birthday, setBirthday] = useState(null)
//    renderContent(){
//         switch(this.props.auth){
//             case null:
//                 return
            
//             case false:
//                return <Route {...this.props} render={props=>{
//                         return <Redirect to={{pathname:"/signin", 
//                                             state:{from:props.location}}}/>
//                 }}/>
                
//             default:
//                 return <Route {...this.props} render={props=>{
//                     console.log(this.props.auth)
//                     console.log("this.props.auth")
//                     // if(this.props.auth.birthday){
//                     //     console.log(auth.birthday)
//                     //     setBirthday(true)
//                     // }
//                     return this.props.auth.birthday?<Component {...props}/>:<Redirect to={{pathname:"/add-info", 
//                     state:{from:props.location}}}/>
                    
//                 }}/>

//         }
//     }

//     render(){
//         return(
//             <div>
                
//                 {this.renderContent()}
               
//             </div>
//         )
//     }
// }

function mapStateToprops({auth}){
    return {auth}
}
export default connect(mapStateToprops,actions)(PrivateRoute)