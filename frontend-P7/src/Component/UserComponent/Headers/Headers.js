/**
 * @author j.boero
 * 
 * Compo Headers
 * Affiche les renseignement de l'utilisateur
 */

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AvatarUser from './logo192.png';
import {CompoUsername, CompoBIo} from './CompoHeaders';
import CompoStatusCompte from './CompoStatusCompte';
import './Header.css';
import {UserContext} from '../../Connection/UserContext'

class Headers extends Component {
    
    render() {
    
        return (
            <UserContext.Consumer>
                {(user) => (
                    <div className=" row d-flex align-items-center p-3 my-3 text-50 rounded shadow-sm"  style={{backgroundColor: "#d8d8d8", border:"2px solid #d1515a"}}>
                        <div className=" boxHeader col-md-9">
                            <img className=" image mr-3" src={AvatarUser} alt="avatar user" width="48" height="48"/>
                            <div className=" 1h-100">
                                <CompoUsername label={user.username}/>
                                <CompoBIo label= {user.bio} />
                                {user.isAdmin === "1" ? <CompoStatusCompte /> : <p></p> }
                            </div>
                        </div>
                        <div className="col-md-3 ">
                        <Link 
                            className="btn btnBox  btn-sm btn-outline-danger btn-block mt-3 " 
                            style={{width: '100px', marginRight: '30px'}} 
                            type="submit" 
                            to="/" 
                            name="accueil"
                            onClick={() => {sessionStorage.clear()}}
                            >sign out !</Link> 
                        </div>
                    </div>
                )}
            </UserContext.Consumer>
        )
    }
}
export default Headers;
