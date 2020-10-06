/**
 * @author j.boero
 * 
 * Composant pour la section envoie d'un message
 * 
 */
import React, { Component } from 'react'
import {Redirect} from'react-router-dom';

export default class CompoSendmessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirection: false,
            sendMessage : true,
            username : this.props.value.username,
            title: '',
            content: '',
            idUser: this.props.value.userId,
            attachement:'',
            likes: '',
            itemsSendMessage : [],
            token : this.props.value.token,
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    envoyerMessage = (event) => {
        event.preventDefault();
        this.setState({
            title: this.state.title,
            content: this.state.content,
            idUser: this.state.idUser,
            attachement:this.state.attachement,
            likes: this.state.likes,
            itemsSendMessage: [...this.state.itemsSendMessage, {title: this.state.title, content: this.state.content, attachement:this.state.attachement, idUser: this.state.idUser, likes: this.state.likes}]
        });

    // envoie de la requete
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Authorization", "Bearer " + this.state.token);

        const urlencoded = new URLSearchParams();
            urlencoded.append("title", this.state.title);
            urlencoded.append("content", this.state.content);
            urlencoded.append("attachement", this.state.attachement);
            urlencoded.append("likes", this.state.likes);
            urlencoded.append("idUser", this.state.idUser);
            urlencoded.append("username", this.state.username);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:4200/api/message", requestOptions)
        .then(response => {
            if (response.status === 200){
                sessionStorage.setItem("msgRetour","message enregistré ")
                this.setState({ redirection: true });
            }
            console.log(response.status);
            return response.json();
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div>
                {this.state.redirection ? (<Redirect to="/chargement"/>): (null)}
                <div>
                    <form onSubmit={this.envoyerMessage}>
                        <div className="form-group">
                            <label htmlFor="title">Titre</label>
                            <input 
                                type="text" 
                                className="form-control"  
                                placeholder="Titre"
                                name="title"
                                onChange={this.onChange}
                                value={this.state.title}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="textarea" >Nouveau message</label>
                            <textarea 
                                className="form-control" 
                                rows="3"
                                name="content"
                                onChange={this.onChange}
                                value={this.state.content}
                            >
                            </textarea>
                        </div>
                    </form>
                    <button 
                        className="btn btnBox w-25 btn-sm btn-outline-primary btn-block mt-3" type="submit" name="signOut>Delete" onClick={this.envoyerMessage}> 
                        Envoyer !
                    </button>
                </div>
            </div>
        )
    }
}
