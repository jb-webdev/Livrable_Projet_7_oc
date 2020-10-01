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

export default class CompoAllUser extends Component {
    constructor(props){
        super(props);
        this.state = { // on recupere l'id au clic du boutton
            redirection: false,
            userAdmin : sessionStorage.getItem("isAdmin"),
            userIdDelete : '',
            usersApi : [],
            token: sessionStorage.getItem('token'),
        }
} 

     // USER DELETE REQUETE FETCH

     onClick = (e) => {
        e.preventDefault();
        console.log('Le lien a été cliqué.');
        console.log(">> Target button => " + e.target.name)
        const targetName = e.target.name;
        this.setState({
            userIdDelete : e.target.name,
        });
 
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Authorization", "Bearer " + this.state.token);

        const urlencoded = new URLSearchParams();
            urlencoded.append("idUser", targetName);
            urlencoded.append("isAdmin", sessionStorage.getItem("isAdmin"));

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
                    console.log(json);
                    this.setState({
                        usersApi : json,
                    })
                })
                .catch(error => console.log('error', error));
        }

    render() {
        return (
            <div>
                {this.state.redirection ? (<Redirect to="/chargement"/>): (null)}
                {this.state.usersApi.map((allUsers) => 
                    <div className="media test-muted pt-3" key={allUsers.IdUSERS} name={allUsers.IdUSERS}>
                        <img className="mr-3" src={AvatarUser} alt="avatar user" width="32" height="32"/>
                        <div className="media-body pb-3 mb-0 small 1h-125 border-bottom border-gray">
                            <strong className="d-block text-gray-dark" key={allUsers.IdUSERS + allUsers.username} >{allUsers.username}</strong>
                            <strong className="d-block text-gray-dark" key={allUsers.IdUSERS + allUsers.email} >{allUsers.email} </strong>
                            <p key={allUsers.IdUSERS + allUsers.bio}>{allUsers.bio}</p>
                        </div>
                        <CompoStatusUser  isAdmin={allUsers.isAdmin} idUser={allUsers.IdUSERS} token={this.state.token} />
                        <div>
                            <button onClick={this.onClick} 
                                className="btn btnBox w-10 btn-sm btn-outline-danger btn-block mt-3" 
                                type="onClick"
                                name= {allUsers.IdUSERS}  
                            >
                                Delete
                            </button>
                        </div>
                    </div> 
                )} 
            </div>
        )
    }
}