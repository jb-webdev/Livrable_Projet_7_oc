/**
 * @author j.boero
 * 
 * Composant qui affiche tous les utilisateurs
 * 
 */
import React, { Component } from 'react'
import AvatarUser from './logo192.png';
import CompoStatusUser from './CompoStatusUser';
import {Redirect} from'react-router-dom';
import './CompoStatusUser.css';
import { UserContext } from '../../Connection/UserContext';

export default class CompoAllUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirection: false,
            userAdmin : this.props.value.isAdmin,
            userIdDelete : "",
            usersApi : [],
            token: this.props.value.token,
        }
} 
     // USER DELETE REQUETE FETCH
     onClick = (e) => {
        e.preventDefault();
        const targetName = e.target.name;
        this.setState({
            userIdDelete : e.target.name,
        });
 
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Authorization", "Bearer " + this.state.token);

        const urlencoded = new URLSearchParams();
            urlencoded.append("idUser", targetName);
            urlencoded.append("isAdmin", this.props.value.isAdmin);

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:4200/api/user/deleteUser", requestOptions)
            .then(response => {
                if (response.status === 200){
                    sessionStorage.setItem("msgRetour","Utilisateur suprimé ! ")
                    this.setState({ redirection: true });
                    
                } else if (response.status === 403){
                    sessionStorage.setItem("msgRetour","Utilisateur suprimer ! ")
                    alert("Suppression utilisateur échoué..!")
                }
                response.json()
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        } 

// REQUETE FETCH POUR RECUPERER TOUS LES USERS
        componentWillMount(){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Authorization", "Bearer " + this.state.token);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };
              
              fetch("http://localhost:4200/api/user/all", requestOptions)
                .then(response => {
                    return response.json()
                })
                .then(json => {
                    this.setState({
                        usersApi : json,
                    })
                })
                .catch(error => console.log('error', error));
        }

    render() {
        return <UserContext.Consumer >
            {user =>
                <div>
                    {this.state.redirection ? (<Redirect to="/chargement"/>): (null)}
                    {this.state.usersApi.map((allUsers) => 
                        <div className="media test-muted pt-3 row" key={allUsers.IdUSERS} name={allUsers.IdUSERS}>
                            <img className="mr-3 blockImg" src={AvatarUser} alt="avatar user" width="32" height="32"/>
                            <div className="media-body pb-3 mb-0 small 1h-125 border-bottom border-gray  col-xs-12 col-sm-8">
                                <strong className="d-block text-gray-dark" key={allUsers.IdUSERS + allUsers.username} >@ {allUsers.username}</strong>
                                <strong className="d-block text-gray-dark blockTitle" key={allUsers.IdUSERS + allUsers.email} >{allUsers.email} </strong>
                                <p className="blockBio" key={allUsers.IdUSERS + allUsers.bio}>{allUsers.bio}</p>
                            </div>
                            <div className="boxAllUser col-xs-12 col-sm-4">
                                <CompoStatusUser  isAdmin={allUsers.isAdmin} idUser={allUsers.IdUSERS} value={user} />
                                <div>
                                    <button onClick={this.onClick} 
                                        className="btn btnAllDel w-10 btn-sm btn-outline-danger btn-block " 
                                        type="onClick"
                                        name= {allUsers.IdUSERS}  
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div> 
                    )} 
                </div>
            }
        </UserContext.Consumer>
    }
}