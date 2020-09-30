/**
 * @author j.boero
 * 
 * Composant pour la section envoie d'un message
 * 
 */
import React, { Component,useState } from 'react'
import {Redirect, Link} from'react-router-dom';
import './ModifyMessage.css';

export default class ModifyMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
            username : sessionStorage.getItem('username'),
            titlePlaceholder : '',
            contentPlaceholder: '',
            titleModify: '',
            contentModify: '',
            redirectPage : false,
        }
    }
    change = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    submit = e => {
        e.preventDefault();
        console.log(this.state.titleModify);
        console.log(this.state.contentModify);
        
        const sendModify = {
            idUser: sessionStorage.getItem("userId"),
            isAdmin: sessionStorage.getItem("isAdmin"),
            idMESSAGES: sessionStorage.getItem("idMessageToModify"),
            title: this.state.titleModify,
            content: this.state.contentModify, 
        }
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(sendModify),
            redirect: 'follow'
        };

        fetch("http://localhost:4200/api/message/modify", requestOptions)
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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
        const idMessage = sessionStorage.getItem("idMessageToModify");
        const idUser = sessionStorage.getItem("userId");
        const isAdmin = sessionStorage.getItem("isAdmin");
        const token = "Bearer " + sessionStorage.getItem("token");
        const msgToModify = {
            idMessage: idMessage,
            idUser: idUser, 
            isAdmin: isAdmin,             
        };

        const myHeaders = new Headers();
            // myHeaders.append("Authorization", token);
            myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(msgToModify ),
            redirect: 'follow'
        };

        fetch("http://localhost:4200/api/message/:message", requestOptions)
            .then(response => {
                console.log(response.status)
               return response.json()
            })
            .then(json =>{ 
                console.log(json)
                this.setState({
                    titlePlaceholder : json.title,
                    contentPlaceholder: json.content,
                })
            })
            .catch(error => console.log('error', error));
    }
 
    render() {
        return (
            <div>
                <div >
                {this.state.redirectPage ? (<Redirect to="/chargement"/>) : (null)}
                <div>
                    <form onSubmit={this.submit}>
                        <div className="form-group mt-5">
                            <p>Message à modifier</p>
                            <label htmlFor="title">Titre à modifier</label>
                            <input className="form-control"  
                                type="text" 
                                placeholder={this.state.titlePlaceholder}
                                id="titleModify"

                                onChange={this.change}
                                value={this.state.titleModify}
                            />
                        </div>
            
                        <div className="form-group">
                            <label htmlFor="textarea" >Text à modifier</label>
                            <textarea className="form-control" 
                                rows="3"
                                id="contentModify"
                                placeholder={this.state.contentPlaceholder}
                                onChange={this.change}
                                value={this.state.contentModify}
                            > 
                            </textarea>
                        </div>
                        <div className='boxButton'>
                            <button 
                                className="btn btnBox btnBoxModify w-25 btn-sm btn-outline-success btn-block" 
                                type="submit" 
                                > 
                                Envoyer !
                            </button>
                            <div className="btn box">
                                <Link className="SimpleLink" to="/chargement">Annuler !</Link>
                            </div>
                        </div>
                    </form> 
                </div>
            </div>
            </div>
        )
    }
}
