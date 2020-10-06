/**
 * @author j.boero
 * 
 * Composant pour la section de modification d'un message
 * 
 */
import React, { Component} from 'react'
import {Redirect, Link} from'react-router-dom';
import './ModifyMessage.css';

export default class ModifyMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
            username : this.props.value.username,
            valueContent : "",
            valueTitle: "",
            
            redirectPage : false,
            token : this.props.value.token,
        }
        console.log( " controle du props => " + this.props)
    }
    handleChange = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    submit = e => {
        e.preventDefault();
        console.log(this.state.valueTitle);
        console.log(this.state.valueContent);
        
        const sendModify = {
            idUser: this.props.value.userId,
            isAdmin: this.props.value.isAdmin,
            idMESSAGES: sessionStorage.getItem("idMessageToModify"),
            title: this.state.valueTitle,
            content: this.state.valueContent, 
        }
        console.log(">>> sendModify => " + sendModify)
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + this.state.token);
            console.log(">>> cotrôle du token avant départ => " + this.state.token)

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(sendModify),
            redirect: 'follow'
        };
    //     // requete pour modifier le message
        fetch("http://localhost:4200/api/message/modify", requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status === 200){
                    this.setState({
                        redirectPage : true,
                    })
                }
                return response.json()
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
// je recupere le message a modifier dans la base de donnée.
    componentDidMount() {
        const idMessage = sessionStorage.getItem("idMessageToModify");
        const idUser = '273';
        const isAdmin = '1';
        const msgToModify = {
            idMessage: idMessage,
            idUser: idUser, 
            isAdmin: isAdmin, 
        }; 
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + this.state.token);
            
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(msgToModify ),
            redirect: 'follow'
        };

        fetch("http://localhost:4200/api/message/:", requestOptions)
            .then(response => {
               return response.json()
            })
            .then(json =>{ 
                this.setState({
                    valueTitle : json.title,
                    valueContent: json.content,
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
                                <textarea className="form-control"  
                                    rows="1"
                                    id="valueTitle"
                                    onChange={this.handleChange}
                                    value={this.state.valueTitle}
                                >
                                </textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="textarea" >Text à modifier</label>
                                <textarea className="form-control" 
                                    rows="3"
                                    id="valueContent"
                                    onChange={this.handleChange}
                                    value={this.state.valueContent}
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
