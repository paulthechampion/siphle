import React, {Component} from "react"
import {connect} from "react-redux"
import {reduxForm, Field} from "redux-form"
import {Link} from "react-router-dom"
import {signInField as formFields} from "../forms/formFields"
import _ from "lodash"
import FormField from "../forms/FormField"
import * as actions from "../../actions"
import {withRouter}  from "react-router-dom"

class SignIn extends Component{


    renderFields(){
        return _.map(formFields, ({label,name,placeholder,type})=>{
         
        return <Field key={name} component={FormField} type={type} name={name} placeholder={placeholder} />
            
        })

    
}

render(){
    return(
        <div>
             <h1 className="first-header center">Sign In</h1>
            <form
            onSubmit={this.props.handleSubmit(values=>this.props.signIn(values,this.props.history))}
             >
                {this.renderFields()}

                <button type="submit" className="teal btn-flat right white-text">
                Sign In
                </button>
           </form>
            <a href="/auth/google">Or Login with Google</a><br/>
            <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
    )
}
}

function validate(values){
    const errors ={}



    _.each(formFields,({name,noValueError})=>{
        if(!values[name]){
            errors[name]= noValueError
        }
    })
    return errors;
}

export default reduxForm({
validate, //created by redux-forms
form:"signin"
})(connect(null,actions)(withRouter(SignIn)))