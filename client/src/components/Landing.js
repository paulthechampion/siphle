import React from 'react'
import {Link} from "react-router-dom"
export default function First() {
    return (
        <div className="first-div">
            <h1 className="first-header">Siphle</h1>

            <p className="first-word">Let's waste no time,<br/>
                Siphle</p>
            <Link to="/signin">
            <button className="btn first-btn">Let's Get Started</button>
            </Link>
        </div>
    )
}
