import React from "react";
import logo from './logo.svg';
import './logo.css'

//React.Fragment
// <></>
function LogoApp() {
    return (
        <div>
            <p className="LogoApp-p">THE P BEN LOGO.JS</p>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    )
}

export default LogoApp;