/**
 * @author j.boero
 * 
 * Composant delete
 * Ne concerne que la section administrateur
 * 
 */
import React, { Component } from 'react'

export default class CompoButtonDeleteUser extends Component {
   
    render() {
        return (
            <div>
                <button 
                    className="btn btnBox w-10 btn-sm btn-outline-danger btn-block mt-3" 
                    type="submit"
                    onClick={this.deleteUser}
                >
                    Delete
                </button>
            </div>
        )
    }
}

