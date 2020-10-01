/**
 * @author j.boero
 * 
 * Compo Body
 * 
 * Contient le corp de la page utilisateur
 * 
 */
import React, { Component } from 'react'
import AvatarUser from './logo192.png';
import "./Body.css";
import CompoSendmessage from '../CompoMessage/CompoSendmessage';
import ModifyMessage from '../CompoMessage/ModifyMessage'
import {Redirect} from'react-router-dom';

export default class Body extends Component {

    state = {  // renseigne toutes les infos utilisateur de la page ici
        redirection: false,
        isAdmin : sessionStorage.getItem("isAdmin"),
        idUser : sessionStorage.getItem('userId'), 
        token: sessionStorage.getItem('token'),  
        messageDelete  : '',
        showMessage : true,
        showModify : false,
        allMessageApi : [],
    }
    
    montrerMessage = () => {
        this.setState({
            showMessage: !this.state.showMessage,
        })
    }

    showModify = e => {
        e.preventDefault();
        const targetName = e.target.name;
        this.setState({
            messagetoModify : e.target.name,
            showModify : true,
        });
        sessionStorage.setItem("idMessageToModify",targetName)
    }
    suppMessage = e => {
        e.preventDefault();
        this.setState({
            messageDelete : e.target.name,
        });
        const idMessageDelete = e.target.name;
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Authorization", "Bearer " + this.state.token);

        const urlencoded = new URLSearchParams();
            urlencoded.append("idUser", this.state.idUser);
            urlencoded.append("isAdmin", this.state.isAdmin);
            urlencoded.append("IdMESSAGE", idMessageDelete);

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:4200/api/message/delete", requestOptions)
            .then(response => {
                if (response.status === 201){
                    sessionStorage.setItem("msgRetour","message suprimé ! ")
                    this.setState({ redirection: true });
                } else if (response.status === 500){
                    sessionStorage.setItem("msgRetour","Oips ! il y a eu un problème de connexion")
                    alert("Suppression utilisateur échoué..!")
                }
                response.json()
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }
    // REQUETE FETCH POUR RECUPERER TOUS LES MESSAGES
    componentDidMount(){
        const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + this.state.token);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          
          fetch("http://localhost:4200/api/message/all", requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                this.setState({
                    allMessageApi : json,
                })
            })
            .catch(error => console.log('error', error));
    }
    render() {
        return (
            <div className ="container">
            {this.state.redirection ? (<Redirect to="/chargement"/>): (null)}
            {this.state.showModify ? (<ModifyMessage />) : (null)}
                <nav>
                     <div className="nav nav-tabs " role="tablist" >
                         <button className="nav-link bg-primary active" type="submit" data-toggle="tab" onClick={this.montrerMessage} >Messagerie</button>
                         <button className="nav-link" type="submit" data-toggle="tab" onClick={this.montrerMessage} >Nouveau message</button>
                     </div>
                 </nav>
                 <div className="tab-content">
                     <div className="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-home-tab">
                     {this.state.showMessage ?(
                        <div>
                            {this.state.allMessageApi.map((allMessages) => 
                                <div className="media test-muted pt-3" label={allMessages.idMESSAGE} key={allMessages.idMESSAGE + allMessages.idAuthor} name={allMessages.idAuthor}>
                                    <img className="mr-3" src={AvatarUser} alt="avatar user" width="32" height="32"/>
                                    <div className="media-body pb-3 mb-0 small 1h-125 border-bottom border-gray">
                                        <strong className="d-block text-gray-dark" key={allMessages.idMESSAGE + allMessages.username}name={allMessages.username}>@ {allMessages.username}</strong>
                                        <strong className="d-block text-gray-dark" key={allMessages.idMESSAGE + allMessages.title}>{allMessages.title}</strong>
                                        <p key={allMessages.idMESSAGE + allMessages.content}>{allMessages.content}</p>
                                        
                                    </div>
                                    {this.state.isAdmin === "1" || this.state.idUser === allMessages.idAuthor? (
                                        
                                    <div className="modifyBox">
                                        <button onClick={this.showModify}
                                            className="btn btnBox w-10 btn-sm btn-outline-primary btn-block mt-3" 
                                            type="onclick"
                                            name={allMessages.idMESSAGE}
                                        >
                                            modifier
                                        </button>
                                        <button onClick={this.suppMessage}
                                            className="btn btnBox w-10 btn-sm btn-outline-danger btn-block mt-3" 
                                            type="onclick"
                                            name={allMessages.idMESSAGE}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                    ) : <p></p> }
                                </div> 
                            )} 
                        </div>
                     ) : <CompoSendmessage />}
                    </div>
                </div>
                
            </div>
        )
    }
}

