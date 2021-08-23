import React, {useState, useContext} from "react"

import * as actions from "../actions"
import {connect} from "react-redux"
import {withRouter}  from "react-router-dom"


function Location(props) {
    
    let info =[]
    const [message,setMessage]=useState(null)
    var lastUpdateTime,
    minFrequency = 10*10000,
    watchOptions = {
        timeout : 60*60*1000,
        maxAge: 0,
        enableHighAccuracy: true
    };

    const sendLocation =e=>{
        e.preventDefault()
        if(!navigator.geolocation){
            return alert('Loaction not surported by browser')
         }
        navigator.geolocation.watchPosition(position=>{
            let lat=position.coords.latitude
            let long = position.coords.longitude
            info=[lat,long]
            var now = new Date();
            if(lastUpdateTime && now.getTime() - lastUpdateTime.getTime() < minFrequency){
                console.log("Ignoring position update");
                return;
            }
            lastUpdateTime = now;
            props.addLocation(info,props.history)

        },function(){
            alert("Unable to fetch location")
        },watchOptions);
 }





    return (
        <div className="add-info-first-div">
            <i className="fas fa-circle"></i> <i className="fas fa-circle"></i> <i className="fas fa-circle"></i> <i className="fas fa-circle"></i>
            <h1 className="add-info-header">Almost there</h1>
            <p>Click the young man to verify your location</p>
            
               
                
                <button className="location-btn" onClick={sendLocation}>
                <i className="fas fa-street-view"></i>
                </button>
               
        </div>
    )
}

export default connect(null,actions)(withRouter(Location))