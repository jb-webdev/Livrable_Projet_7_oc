/**
 * @author j.boero
 * 
 * Compo Headers
 * Affiche les renseignement de l'utilisateur
 */

import React, { Component } from 'react';
// import {BrowserRouter as Router, Route, Switch,Redirect} from'react-router-dom';
import {Link} from 'react-router-dom';
import AvatarUser from './logo192.png';
import {CompoUsername, CompoBIo} from './CompoHeaders';
import CompoStatusCompte from './CompoStatusCompte';

export default class Headers extends Component {
    state = {
        isAdmin : sessionStorage.getItem("isAdmin"),
        idUser : sessionStorage.getItem("userId"),   
        username: sessionStorage.getItem("username"),
        bio: sessionStorage.getItem("bio"),
        email: sessionStorage.getItem("email"),
        dateInscription: '17 septembre 2020',
    }
    
    // handleClick (e) {
    //     e.preventDefault();
    //     sessionStorage.clear(); 
    // }

    // isAdminRec = () => {
    //     console.log( this.state.isAdmin)
    //     // this.setState({
    //     //     isAdmin : sessionStorage.getItem(sessionStorage.getItem("isAdmin"))
    //     // });
    // }
    render() {
        // console.log( "dans le setset" + sessionStorage.getItem("isAdmin"));
        return (
            <div className="d-flex align-items-center p-3 my-3 text-50 rounded shadow-sm"  style={{backgroundColor: "#d8d8d8", border:"2px solid #d1515a"}}>
                <img className="mr-3" src={AvatarUser} alt="avatar user" width="48" height="48"/>
                <div className=" 1h-100">
                    <CompoUsername label={this.state.username}/>
                    <CompoBIo label= {this.state.bio} />
                    {this.state.isAdmin == 1 ? <CompoStatusCompte /> : <p></p> }
                </div>
                <Link 
                    className="btn btnBox  btn-sm btn-outline-danger btn-block mt-3 " 
                    style={{width: '100px', marginRight: '30px'}} 
                    type="submit" 
                    to="/" 
                    name="accueil"
                    onClick={() => {sessionStorage.clear()}}
                    >sign out !</Link> 
            </div>
        )
    }
}
