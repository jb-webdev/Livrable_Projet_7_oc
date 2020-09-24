/**
 * @author j.boero
 * 
 * Compo Page d'acceuil
 * 
 * Compo conneTion utilisateur
 * 
 */

import React, { Component } from 'react'
import LoginUser from './Login'
import SignupUser from './Signup'
import '../Connection.css'

export default class CompoConnection extends Component {
    state = {
        showLogin : true,
        showSignup : false,
    }
    showLogin = () => {
        this.setState({
            showLogin : !this.state.showLogin,
            showSignup : !this.state.showSignup,
        })
    }

    showSignup = () => {
        this.setState({
            showSignup : !this.state.showSignup,
            showLogin : !this.state.showLogin,
        })
    }

    render() {
        return (
            <div className="container">

                {this.state.showLogin ? 
                (<LoginUser />) : 
                (<button 
                    className="btn btn-input btn-lg btn-outline-primary btn-block mt-3" 
                    type="submit" 
                    onClick={this.showLogin} 
                    >
                        Se connecter !
                </button>
                )}
                
                {this.state.showSignup ? 
                (<SignupUser />) : 
                (<button 
                    className="btn btn-input btn-lg btn-outline-primary btn-block mt-3" 
                    type="submit" 
                    onClick={this.showSignup} 
                    >
                        S'enregistrer !
                </button>)}
            
            </div>
        )
    }
}