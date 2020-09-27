import React, { Component } from 'react'
import './Spinner.css'

export default class spinner extends Component {

    constructor(props){
        super(props);
        setTimeout(() =>{
            this.props.history.push('/user')
        }, 2000);
    }
   

    render() {
        
        return (
            <div className='container container-spinner'>
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p>Chargement .....</p>
            </div>
        )
    }
}

