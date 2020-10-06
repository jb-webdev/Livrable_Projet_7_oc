/**
 * @author j.boero
 * 
 * Composant qui affiche l'option de changement de status d'un utilisateurs
 * 
 */
import React, { Component } from 'react'
import {Redirect} from'react-router-dom';
import './CompoStatusUser.css';

export default class CompoStatusUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            curentStatus : this.props.isAdmin,
            isAdmin : this.props.value.isAdmin,
            changeStatus : '',
            redirectPage: false,
        }  
    }
    
    curentStatusToModify = (e) => {
        console.log(e.target.name);
        e.preventDefault();
        const changeStatus = e.target.name
        this.setState({
            changeStatus : changeStatus,
        })

        const changementStatus = {
            isAdmin : this.props.value.isAdmin,
            idUser: this.props.idUser,
            status: changeStatus,
        };

        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + this.props.value.token);

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify( changementStatus ),
            redirect: 'follow'
        };

        fetch("http://localhost:4200/api/user/status", requestOptions)
            .then(response => {
                if (response.status === 200){
                    this.setState({
                        redirectPage : true,
                    })
                }
                return response.json()
            })
            .then(json => console.log(json))
            .catch(error => console.log('error', error));
    }
    
    render() {
        return (
            <div className="boxStatus" >
            {this.state.redirectPage ? (<Redirect to="/chargement"/>) : (null)}
                {this.state.curentStatus !== 0 ? (
                    <button className="btn btnBox btnAll w-10 btn-sm btn-outline-primary btn-block"  
                        type="onClick" 
                        name= "0"
                        
                        onClick={this.curentStatusToModify}
                        >
                            Admin
                    </button>
                ) : (
                    <button className="btn btnBox btnAll w-10 btn-sm btn-outline-success btn-block"  
                        type="onClick" 
                        name= "1"
                        
                        onClick={this.curentStatusToModify}
                        >
                            User
                    </button>
                )}   
            </div>
        )
    }
}


