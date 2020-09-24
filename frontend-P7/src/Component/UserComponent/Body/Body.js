import React, { Component } from 'react'
import AvatarUser from './logo192.png';
// import MessageToMap from "./MessageToMap";
import "./Body.css";
import CompoSendmessage from '../CompoMessage/CompoSendmessage';
import CompoButtonDeleteUser from '../AdminCompo/CompoButtonDelete';

export default class Body extends Component {

    state ={  // renseigne toutes les infos utilisateur de la page ici
        isAdmin : true,
        idUser : '212',   
      

        showMessage : true,
        allMessageApi : [],
    
    }
    
    montrerMessage = () => {
        this.setState({
            showMessage: !this.state.showMessage,
        })
    }

    // REQUETE FETCH POUR RECUPERER TOUS LES MESSAGES
    componentDidMount(){
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:4200/api/message/all", requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log(json);
                
                this.setState({
                    allMessageApi : json,
                })
                console.log(">>> user API =>" + this.state.allMessageApi[0].title);
                
                
            })
            .catch(error => console.log('error', error));
    }
    render() {

        
        return (
            
            <div className ="container">
                <nav>
                     <div className="nav nav-tabs " id="nav-tab" role="tablist" >
                         <button className="nav-link bg-primary active" type="submit" data-toggle="tab" onClick={this.montrerMessage} >Messagerie</button>
                         <button className="nav-link" type="submit" data-toggle="tab" onClick={this.montrerMessage} >Nouveau message</button>
                         {/* {infoUser.isAdmin ? <button className="nav-link" type="submit" data-toggle="tab" >User</button> : <div></div>} */}
                     </div>
                 </nav>
                 <div className="tab-content" id="nav-tabContent">
                     <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                     {this.state.showMessage ?(
                        <div>
                            {this.state.allMessageApi.map((allMessages) => 
                                <div className="media test-muted pt-3" label={allMessages.idMessage} key={allMessages.idMessage} name={allMessages.author}>
                                    <img className="mr-3" src={AvatarUser} alt="avatar user" width="32" height="32"/>
                                    <div className="media-body pb-3 mb-0 small 1h-125 border-bottom border-gray">
                                        <strong className="d-block text-gray-dark" key={allMessages.idMessage}>@ {allMessages.username}</strong>
                                        <strong className="d-block text-gray-dark" key={allMessages.idMessage}>{allMessages.title}</strong>
                                        <p>{allMessages.content}</p>
                                    </div>
                                    {this.state.isAdmin ? <CompoButtonDeleteUser/> : <p></p> }
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

