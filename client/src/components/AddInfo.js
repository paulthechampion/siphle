import React, {Component} from "react"
import {connect} from "react-redux"
import {reduxForm, Field} from "redux-form"
import {Link} from "react-router-dom"
import {addInfoField as formFields} from "./forms/formFields"
import _ from "lodash"
import FormField from "./forms/FormField"
import * as actions from "../actions"
import {withRouter}  from "react-router-dom"
import DatePicker from "react-datepicker"

class AddInfo extends Component{
 
    state={
        startDate:null
    }

    renderFields(){
        return _.map(formFields, ({label,name,placeholder,type,className,max})=>{
         
        return <Field key={name} component={FormField} type={type} name={name} placeholder={placeholder} className={className} max={max}/>
            
        })

    
}

render(){
    return(
        <div>
             <h1 className="first-header center">Last  Step</h1>
             <p className="center">Add these Infomation</p>
            <form
            onSubmit={this.props.handleSubmit(values=>this.props.addInfo(values,this.props.history))}
             >
                {this.renderFields()}
               
                <button type="submit" className="teal btn-flat right white-text">
                Finish
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
form:"addinfo"
})(connect(null,actions)(withRouter(AddInfo)))