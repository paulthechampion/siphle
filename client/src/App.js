import React, {Component} from "react"
import {BrowserRouter, Route} from "react-router-dom"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import * as actions from "./actions"

import PrivateRoute from "./HOC/PrivateRoutes"
import UnPrivateRoute from "./HOC/UnprivateRoutes"
import AddInfoRoute from "./HOC/AddInfoRoute"

import Landing from "./components/Landing"
import Signin from "./components/sign/Signin"
import Signup from "./components/sign/Signup"
import Home from "./components/Home"
import AddInfo from "./components/AddInfo"
import Location from "./components/Location"
import Nearby from "./components/Nearby"
import Navigation from "./components/Navigation"

import './css/App.css';

class App extends Component{
  componentDidMount(){
    this.props.fetchUser()
  }
  

  render(){
    
    return(
      <div className="container">
          <BrowserRouter>
              <div>
                  <UnPrivateRoute exact path ="/" component={Landing} user={this.props.auth}/>
                  <UnPrivateRoute exact path = "/signin"  component ={Signin} user={this.props.auth}/>
                  <UnPrivateRoute exact path = "/signup" component ={Signup} user={this.props.auth}/>
                  <AddInfoRoute exact path ="/add-info" component={AddInfo} user={this.props.auth}/>
                  <PrivateRoute exact path="/home" component={Home} user={this.props.auth}/>
                  <PrivateRoute exact path="/location" component={Location} user={this.props.auth}/>
                  <PrivateRoute exact path="/nearby" component={Nearby} user={this.props.auth}/>
                  <Navigation/>
              </div>
          </BrowserRouter>
      </div>
    )
  }
}

function mapStateToprops({auth}){
  return {auth}
}

export default connect(mapStateToprops,actions)(App);
