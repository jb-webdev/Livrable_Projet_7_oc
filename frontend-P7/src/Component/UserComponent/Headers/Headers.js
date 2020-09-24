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
import {CompoUsername, CompoInscription} from './CompoHeaders';
import CompoStatusCompte from './CompoStatusCompte';

export default class Headers extends Component {
    state = {
        isAdmin : true,
        idUser : '212',   
        username: 'Fréderic',
        bio: 'service compta',
        email: 'fred@toto.com',
        dateInscription: '17 septembre 2020',
    }
    render() {
        return (
            <div className="d-flex align-items-center p-3 my-3 text-50 rounded shadow-sm"  style={{backgroundColor: "#d8d8d8", border:"2px solid #d1515a"}}>
                <img className="mr-3" src={AvatarUser} alt="avatar user" width="48" height="48"/>
                <div className=" 1h-100">
                    <CompoUsername label={this.state.username}/>
                    <CompoInscription label= {this.state.dateSignup} />
                    {this.state.isAdmin ? <CompoStatusCompte /> : <p></p> }
                </div>
                <Link className="btn btnBox  btn-sm btn-outline-danger btn-block mt-3 " style={{width: '100px', marginRight: '30px'}} type="submit" to="/" name="accueil">sign out !</Link> 
            </div>
        )
    }
}
