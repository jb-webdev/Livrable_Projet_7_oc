/**
 * @author j.boero
 * 
 * Composant accueil all Users
 * 
 */
import React, { Component } from 'react';
import CompoAllUser from './CompoAllUsers';
import { UserContext } from '../../Connection/UserContext';

export default class CompoBoxAllUser extends Component {
    state ={
        showUser : false,
    }

    montrerUser = () => {
        this.setState({
            showUser: !this.state.showUser
        })
    }

    render() {
        return <UserContext.Consumer>
            {user =>
                <div>
                    <nav>
                        <div className="nav nav-tabs " id="nav-tab" role="tablist" >
                            <button 
                                className="nav-link bg-success active" 
                                type="submit" data-toggle="tab" 
                                onClick={this.montrerUser} 
                            >All users
                            </button>
                        </div>
                    </nav>
                    {this.state.showUser ? (<CompoAllUser value={user} />  ) : null}
                </div>
        }
        </UserContext.Consumer>
    }
}