import React, {useState, useEffect,Component} from "react"
import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {withRouter}  from "react-router-dom"
import {fetchNearby,fetchUserInfo} from "../actions"
import NearbyBtn from "./NearbyBtn"

class Nearby extends Component{
    // const [showfollow, setShowFollow] = useState(true)
    constructor(props){
        super(props)
        this.state ={
            mssg:"",
            user:null,
            class:""
        }
    }
   componentDidMount(){
    this.props.fetchNearby()
    this.props.fetchUserInfo()
    this.setState({viewForm:true})
    this.setState({
        user:this.props.userInfo
    })
   }

   

    
    renderContent(){
        console.log(this.state.user)
       return this.props.nearby.map(near=>{
           return( 
                <div key={near._id}>
                   <div>{near.user.email}
                   <NearbyBtn user={near.user}/>
                   </div> 
                  
                </div>
            )
        })
        
    }

    render(){
        return (
            <div>
                <h1>Near by</h1>
                {this.state.mssg}
                {this.renderContent()}
                
            </div>
        )
    }
}

function mapStateToProps({nearby,userInfo}){
    return {nearby,userInfo}
}

export default connect(mapStateToProps,{fetchNearby,fetchUserInfo})(withRouter(Nearby))