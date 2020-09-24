/**
 * @author j.boero
 * 
 * 
 * Composant qui affiche tous les tutilisateur à l'administrateur
 * 
 */
import React, { Component } from 'react'
import AvatarUser from './logo192.png';


export default class CompoAllUser extends Component {
    state = { // on recupere l'id au clic du boutton
        userIdDelete : " ",
        usersApi : [],
    }
    
    // USER DELETE REQUETE FETCH
    deleteUser = (event) => {
        event.preventDefault();
        this.setState({
            
        userIdDelete : event.target.name,
        })
        console.log(this.state.userIdDelete)

        const userDel = this.state.userIdDelete;
        console.log(userDel);

        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
            urlencoded.append("idUser", this.state.userIdDelete);
            urlencoded.append("isAdmin", "1");

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };

        fetch("http://localhost:4200/api/user/deleteUser", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                 
            })
            .catch(error => console.log('error', error));
    } 
   

    // REQUETE FETCH POUR RECUPERER TOUS LES USERS
    componentWillMount(){
        const requestOptions = {
            method: 'GET',
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
                console.log(">>> user API =>" + this.state.usersApi[0].username);
            })
            .catch(error => console.log('error', error));
    }
    render() {
        return (
            <div>
                {this.state.usersApi.map((allUsers) => 
                    <div className="media test-muted pt-3" label={allUsers.IdUSERS} key={allUsers.IdUSERS} name={allUsers.IdUSERS}>
                        <img className="mr-3" src={AvatarUser} alt="avatar user" width="32" height="32"/>
                        <div className="media-body pb-3 mb-0 small 1h-125 border-bottom border-gray">
                            <strong className="d-block text-gray-dark"hey="allUsers.IdUSERS" key={allUsers.IdUSERS} >{allUsers.username}</strong>
                            <strong className="d-block text-gray-dark"hey="allUsers.IdUSERS" key={allUsers.IdUSERS} >{allUsers.email} </strong>
                            <p key={allUsers.IdUSERS}>{allUsers.bio}</p>
                        </div>
                        <div>
                            <button 
                                className="btn btnBox w-10 btn-sm btn-outline-danger btn-block mt-3" 
                                type="submit"
                                name= {allUsers.IdUSERS}
                                onClick={this.deleteUser}
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