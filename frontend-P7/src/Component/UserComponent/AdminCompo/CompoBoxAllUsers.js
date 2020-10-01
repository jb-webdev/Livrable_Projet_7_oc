/**
 * @author j.boero
 * 
 * Composant acceuil all Users
 * 
 */
import React, { Component } from 'react';
import CompoAllUser from './CompoAllUsers';


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
        
        return (
            <div>
                <nav>
                     <div className="nav nav-tabs " id="nav-tab" role="tablist" >
                         <button 
                            className="nav-link bg-primary active" 
                            type="submit" data-toggle="tab" 
                            onClick={this.montrerUser} 
                         >All users
                         </button>
                     </div>
                 </nav>
                {this.state.showUser ? (<CompoAllUser/>  ) : null}
            </div>
        )
    }
}