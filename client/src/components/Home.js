import React, {Component} from 'react'
import {connect} from "react-redux"
import {getHome,csrfUp} from "../actions"

class Home extends Component{
    componentDidMount(){
        this.props.csrfUp()
         this.props.getHome()
       
    }
    
    render(){
        //console.log(this.props.home)
        return(
            <div className="home">
                <a href="/auth/api/logout">Logout</a>
                <div className="card home-card">
                    
                    {/* <h5>Champin</h5> */}
                    <div className="card-image">
                        <img src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                        className="home-card"
                        ></img>
                    </div>
                    <div>
                    <i class="fas fa-heart" style={{color:"red"}}></i>
                        <h6>Title</h6>
                        <p>This is amazing</p>
                        <input type="text" placeholder="add a comment"/>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToprops({home}){
    return {home}
}

export default connect(mapStateToprops,{getHome,csrfUp})(Home)
