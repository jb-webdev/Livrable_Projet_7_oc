/**
 * @author j.boero
 * 
 * 
 * Composant pour la section envoie d'un message
 * 
 */
import React, { Component } from 'react'

export default class CompoSendmessage extends Component {

    state ={
        sendMessage : true,
    }

    envoyerMessage = () => {
        this.setState({
            sendMessage: !this.state.sendMessage
        })
        console.log(this.state.sendMessage);
    }


    render() {
        return (
            <div>
                <div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Titre</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Titre"/>
                        </div>
            
                        <div className="form-group">
                            <label htmlFor="textarea" >Nouveau message</label>
                            <textarea className="form-control" rows="3"></textarea>
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
