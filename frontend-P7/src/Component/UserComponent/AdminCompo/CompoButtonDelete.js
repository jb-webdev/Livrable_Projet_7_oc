/**
 * @author j.boero
 * 
 * Composant delete
 * Pour ne concerne que la section administrateur
 * 
 */
import React, { Component } from 'react'




export default class CompoButtonDeleteUser extends Component {
    
    
    // deleteUserApp = () =>{
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
    //     const urlencoded = new URLSearchParams();
    //     urlencoded.append("idUser", "170");
    //     urlencoded.append("isAdmin", "1");
        
    //     const requestOptions = {
    //       method: 'DELETE',
    //       headers: myHeaders,
    //       body: urlencoded,
    //       redirect: 'follow'
    //     };
        
    //     fetch("http://localhost:4200/api/user/deleteUser", requestOptions)
    //       .then(response => response.text())
    //       .then(result => console.log(result))
    //       .catch(error => console.log('error', error));

    render() {

        return (
            
            <div>
                <button 
                    className="btn btnBox w-10 btn-sm btn-outline-danger btn-block mt-3" 
                    type="submit"
                    // name={labelDelete}
                    onClick={this.deleteUser}
                >
                    Delete
                </button>
            </div>
        )
    }
}

