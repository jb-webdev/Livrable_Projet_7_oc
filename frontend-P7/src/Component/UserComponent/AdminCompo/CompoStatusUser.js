/**
 * @author j.boero
 * 
 * Composant qui affiche l'option de changement de staus d'un utilisateurs
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
            isAdmin : sessionStorage.getItem('isAdmin'),
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
            isAdmin : sessionStorage.getItem('isAdmin'),
            idUser: this.props.idUser,
            status: changeStatus,
        };
        console.log(this.props.token);
        console.log(changementStatus);

        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + this.props.token);

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify( changementStatus ),
            redirect: 'follow'
        };

        fetch("http://localhost:4200/api/user/status", requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status == 200){
                    this.setState({
                        redirectPage : true,
                    })
                    console.log(">>> response dans la conditon fetch 200 => ok ca marche")
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
                {this.state.curentStatus != 0 ? (
                    <button className="btn btnBox w-10 btn-sm btn-outline-primary btn-block mt-3"  
                        type="onClick" 
                        name= "0"
                        
                        onClick={this.curentStatusToModify}
                        >
                            Admin
                    </button>
                ) : (
                    <button className="btn btnBox w-10 btn-sm btn-outline-success btn-block mt-3"  
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


