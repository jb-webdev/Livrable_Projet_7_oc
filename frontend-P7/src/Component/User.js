/**
 * @author j.boero
 * 
 * Compo Page utilisateur
 * 
 * Point d'entrée de la page utilisateur après connection
 */
import React, { Component } from 'react'
import Headers from './UserComponent/Headers/Headers'
import Body from './UserComponent/Body/Body'
import CompoBoxAllUsers from './UserComponent/AdminCompo/CompoBoxAllUsers';
import ErrorPage from './ErrorPage/ErrorPage';
import { UserContext } from './Connection/UserContext';

export default class User extends Component {
     
        constructor(props){
            super(props);
            this.state = {};
        }
        render() { 
            return <UserContext.Consumer>
                {user => 
                    <div>
                        {user.connect ? (
                            <div className="container mt-3">
                                <Headers/> 
                                {this.props.value.isAdmin === 1 ? (<CompoBoxAllUsers value={user} />) : null}
                                <Body value={user}/>
                            </div>
                            ) : (<ErrorPage/>)}
                    </div>  
                }  
            </UserContext.Consumer> 
        }
}


