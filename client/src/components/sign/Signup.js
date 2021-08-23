import React, {Component} from "react"
import {connect} from "react-redux"
import {reduxForm, Field} from "redux-form"
import {Link} from "react-router-dom"
import {signUpField as formFields} from "../forms/formFields"
import _ from "lodash"
import FormField from "../forms/FormField"
import {withRouter} from "react-router-dom"
import * as actions from "../../actions"

class SignUp extends Component{

    
    renderFields(){
        return _.map(formFields, ({label,name,placeholder,type})=>{
         
        return <Field key={name} component={FormField} type={type} name={name} placeholder={placeholder} />
            
        })

    
}

render(){
    return(
        <div>
             <h1 className="first-header center">Sign Up</h1>
          
            <form
             onSubmit={this.props.handleSubmit(values=>{this.props.signUp(values,this.props.history)})}
             >
                {this.renderFields()}

                <button type="submit" className="teal btn-flat right white-text">
                Sign Up
                </button>
           </form>
            <a href="/auth/google">Or Login with Google</a><br/>
            <Link to="/signin">Already have an account? Sign in</Link>
        </div>
    )
}
}
function validateConfirmEmail(password, confirmPassowrd){
    if(password != confirmPassowrd){
        return "Your passwords must match"
    }
}

function validate(values){
 
    const errors ={}

    errors.confirmPassword = validateConfirmEmail(values.password,values.confirmPassword)


    _.each(formFields,({name,noValueError})=>{
        if(!values[name]){
            errors[name]= noValueError
        }
    })


    return errors;
}

function mapStateToprops({auth}){
    return {auth}
}

export default  reduxForm({
    validate,
    form:"signup"
})(connect(mapStateToprops, actions)(withRouter(SignUp)))