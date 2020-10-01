/**
 * @author j.boero
 * 
 * Compo Page utilisateur
 * 
 * Point d'entrée de la page utilisateur après connection
 */
import React, { Component } from 'react'
import Headers from './UserComponent/Headers/Headers'
import Body from './UserComponent/Body/Body'
import CompoBoxAllUsers from './UserComponent/AdminCompo/CompoBoxAllUsers';
import ErrorPage from './ErrorPage/ErrorPage';

export default class User extends Component {
    state = {
        userConnect: sessionStorage.getItem("connect"),
        isAdmin: sessionStorage.getItem("isAdmin"),
        userId: sessionStorage.getItem("userId"),
        username : sessionStorage.getItem("username"),
        email: sessionStorage.getItem("email"),
        token : sessionStorage.getItem("token"),
    }; 
    
    render() { 
        return (
            <div>
                {this.state.userConnect ? (
                    <div className="container mt-3">
                        <Headers/> 
                        {this.state.isAdmin === "1" ? (<CompoBoxAllUsers />) : null}
                        <Body />
                    </div>
                ) : (<ErrorPage/>)}
                </div>  
            )
        }
}


