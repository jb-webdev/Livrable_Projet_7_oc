/**
 * @author j.boero
 * 
 * Composant pour la section envoie d'un message
 * 
 */
import React, { Component } from 'react'
// import {Redirect} from'react-router-dom';

export default class ModifyMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',

            author:'',
            titlePlaceholder: '',
            contentPlacholder: '',
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
        console.log(this.state.title)
    }
    modifyMessage = (event) => {
        event.preventDefault();
        this.setState({
            title: this.state.title,
            content: this.state.content,
            itemsSendMessage: [...this.state.itemsModifMessage, {title: this.state.title, content: this.state.content}]
        });
        console.log(this.state.title);
    }
    render() {
        return (
            <div>
                <div>
                {/* {this.state.redirection ? (<Redirect to="/chargement"/>): (null)} */}
                <div>
                    <form onSubmit={this.modifyMessage}>
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
            </div>
        )
    }
}
