/**
 * @author j.boero
 * 
 * Compo Page spinner
 * 
 */
import React, { Component } from 'react'
import './Spinner.css'

export default class spinner extends Component {

    constructor(props){
        super(props);
        setTimeout(() =>{
            this.props.history.push('/user')
        }, 500);
        this.state = {
            message : sessionStorage.getItem("msgRetour")
        }
    }
    render() {
        
        return (
            <div className='container container-spinner'>
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                {this.state.message !== null ? (<h4>{this.state.message}</h4>) : null}
                <p>Chargement .....</p>
            </div>
        )
    }
}

