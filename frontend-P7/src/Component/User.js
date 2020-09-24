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
import CompoBoxAllUser from './UserComponent/AdminCompo/CompoBoxAllUsers'

export default class User extends Component {
    
    state = {
        id: true,
        isAdmin : true,
    }
    
    render() {

            return (
                <div className="container mt-3">
                    <Headers/>
                    {this.state.isAdmin ? <CompoBoxAllUser /> : null}
                    <Body />
                </div>
            )
        }
}


