import React from 'react'




export default ({input,label, type, placeholder,max, meta:{error, touched}})=>{ //props.input es6{input}
    return (
        <div>
            <label>{label}</label>
            <input {...input} type={type} placeholder={placeholder}style={{marginBottom:"5"}} max={max}/>
            <div className="red-text" style={{marginBottom:"20px"}}>
            {touched?error:""}
            </div>
          
        </div>
    )
}
