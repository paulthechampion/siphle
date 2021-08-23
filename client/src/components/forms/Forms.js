import _ from "lodash" // convention to import lodash
import React,{Component} from "react"
import {reduxForm, Field, Form} from "redux-form"
import FormField from "./FormField"
import {Link} from "react-router-dom"
//import validateEmails from "../../utils/validateEmails"

//above array is to Help reduced the amount of
//manual field created since they're almost similar


class Forms extends Component{
   

    renderFields(){
            return _.map(this.props.formFields, ({label,name,placeholder,type})=>{
             
            return <Field key={name} component={FormField} type="password" name={name} placeholder={placeholder} />
                
            })

        
    }

    render(){
        return(
            <div>
                <form //props.handleSubmit is provided to us authomatically by the redux-forms below in the export default
                // onSubmit={this.props.handleSubmit(/*this.props.onSurveySubmit*/)}
                 >
                    {this.renderFields()}

                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>

                    <button type="submit" className="teal btn-flat right white-text">Next
                    <i className="material-icons right">done</i>
                    </button>
               </form>

               
            </div>
        )
    }
}

// function validate(values){
//     //values parameter above is given to us by
//     //redux-form it's basically all the collective values of our
//     // form

//     const errors ={}
    
//     errors.recipients = validateEmails(values.recipients || "")


//     _.each(formFields,({name,noValueError})=>{
//         if(!values[name]){
//             errors[name]= noValueError
//         }
//     })

//     // if(!values.title){
//     //     errors.title ="You must provide a Title"
//     // }
//     // if(!values.subject){
//     //     errors.subject ="You must provide a Subject"
//     // }
//     // if(!values.body){
//     //     errors.body ="You must provide an Email body"
//     // }

//     return errors;
// }

export default reduxForm({
    //validate, //created by redux-forms
    form:"surveyForm",
    destroyOnUnmount:false
})(Forms)