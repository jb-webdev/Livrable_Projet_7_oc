/**
 * @author j.boero
 * 
 * Compo Navigation
 * Affiche la NavBar 
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LogoRed from "./logoWhite.png";


export default class Navigation extends Component {
     
    constructor(props){
        super(props);
        this.state = {

        };
        this.purgeProps = this.purgeProps.bind(this)
    }

    purgeProps = () => {
        const user = {
        connect: "",
        userId:  "",
        username : "",
        email :"",
        bio : "",
        isAdmin : "",
        token : ""
    }
    this.setState(user)
    this.props.changeUser(user)
    }
    render (){ 
        return (
            <div className="navbar navbar-expand-lg" style={{backgroundColor: "#091f43"}}>
                <Link className="navbar-brand" to="/"><img src={LogoRed} alt="logo groupomania" style={{height: "50px"}} /></Link>
                <button className="navbar-toggler" onclick={this.purgeProps} type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        )
    }
}



