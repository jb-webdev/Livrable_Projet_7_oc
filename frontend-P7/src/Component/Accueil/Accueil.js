/**
 * @author j.boero
 * 
 * Compo Page d'acceuil
 * 
 * Page de connexion utilisateur
 * 
 */

import React, { Component } from 'react'

import CompoConnection from './Connection/CompoConnection';


export default class Accueil extends Component {
    state = {
        userConnect : false,
        
    }


    render() {
        return (
            <div className="container">
                {this.state.userConnect ? (<h1>hello page user</h1>) : (<CompoConnection />)}
                    
                
            </div>
        )
    }
}



