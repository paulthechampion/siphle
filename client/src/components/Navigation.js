import React, { Component } from 'react'
import rocket from "./img/rocket.png"
import Group from "./img/Group.png"
import homeBtn from "./img/home_btn.png"
import noti from "./img/noti.png"
import search from "./img/search.png"
import Vector from "./img/Vector.png"
import mssg from "./img/mssg.png"
import travel from "./img/travel.png"
import {Link} from "react-router-dom"

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav-main-div">
                <div className="top-navigation">
                    <div className="top-navigation-minidiv">
                        <img src={Vector} alt="icon"/>
                    </div>
                    <div className="top-navigation-minidiv rocket-div">
                        <img src={rocket} alt="icon" />
                    </div>
                    <div className="top-navigation-minidiv">
                        <img src={search} alt="icon"/>
                    </div>
                </div>
                <div className="bottom-navigation">
                    <div className="travel-div">
                         <img src={travel} alt="icon" className="travel-icon"/>
                    </div>
                    
                    <div className="bottom-navigation-maindiv">
                        
                        <div className="bottom-navigation-minidiv">
                            <Link to="/home"><img src={homeBtn} alt="icon"/></Link>
                        
                        </div>
                        <div className="bottom-navigation-minidiv">
                            <Link to="/nearby"><img src={Group} alt="icon"/></Link>
                        </div>
                        <div className="bottom-navigation-minidiv">
                            <Link to="/notifications"><img src={noti} alt="icon"/></Link>
                        </div>
                        <div className="bottom-navigation-minidiv">
                            <Link to="/messages"><img src={mssg} alt="icon"/></Link>
                            
                        </div>
                </div>
               </div>
            </div>
        )
    }
}
