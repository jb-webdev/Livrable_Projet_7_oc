/**
 * @author j.boero
 * 
 * Compo Page d'erreur
 * 
 * page d'erreur avec une redirecton sur la page d'acceuil
 * pour obliger l'utilisateur à s'authentifier
 */

import React, { Component } from 'react';
import './ErrorPage.css';


// const ErrorPage = (props) => {
class ErrorPage extends Component  {  
    constructor(props){
        super(props);
        
        setTimeout(() =>{
            this.props.history.push('/')
        }, 2000);
    }
    
    
    
    render () {
        
        return (

            <div className="container">
                <div className="alert alert-danger alert-dismissible fade show my-3" role="alert">
                    <strong style={{color:"red"}}>  Oups!</strong> Vous ne vous êtes pas connecter! veuillez utiliser vos identifiant !.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <h1>Oups !!</h1>
            </div>
        )
    }
}


export default ErrorPage
