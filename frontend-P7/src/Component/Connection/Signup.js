/**
 * @author j.boero
 * 
 * Compo Section Signup
 * Affiche un formulaire d'enregistrement utilisateur
 */
import React, { Component } from 'react';
import LogoGroup from './bigLogoRed.png';
import {Link, Redirect} from'react-router-dom';
import './Connection.css';

export default class SignupUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            statusRedirection: false,
            email: '',
            username: '',
            password: '',
            bio: '',
            isAdmin: '0',
            userId: 0,
            token: "",
            items:[]
        }
    }

    // on écoute le changement de valeur dans les inputs
    
    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    } 
      // on ecoute l'evenement du bouton 
    onSubmit = (event) => {
        event.preventDefault();
        this.setState({

            email: this.state.email,
            username: this.state.username,
            bio: this.state.bio,
            password: this.state.password,
            items: [...this.state.items, {username: this.state.username, email: this.state.email, bio: this.state.bio, password: this.state.password}]
        });
        // requête fetch début
            const email = this.state.email;
            const username = this.state.username;
            const password = this.state.password;
            const bio = this.state.bio;
            
            const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                
            const urlencoded = new URLSearchParams();
                urlencoded.append("email", email);
                urlencoded.append("username", username);
                urlencoded.append("password", password);
                urlencoded.append("bio", bio);
                
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow',
            };
            
            fetch("http://localhost:4200/api/user/signup", requestOptions)
            .then(response => {
                console.log(response.status)
                if (response.status === 200){
                    this.setState({
                        statusRedirection: true,
                    })
                }
                return response.json();
            })
            .then(json => {
                if (json.username ) {
                    const user = {
                        connect: true,
                        userId:  json.userId,
                        username : json.username,
                        email : json.email,
                        bio : json.bio,
                        isAdmin : json.isAdmin,
                        token : json.token
                    }
                    this.setState(user)
                    this.props.changeUser(user)
                }
            })
            .catch(error => console.log('error', error));
    } 

    render() {
        
        
        return (
            <div >
                {this.state.statusRedirection ? (<Redirect to="/user" />) : (null)}
                <div className="row justify-content-center">
                    <form onSubmit={this.onSubmit}>
                        <img className="form  mt-5" src={LogoGroup} alt="logo groupomania" style={{ height: "150px"}} />
                        <h1 className="h3- mt-3 mb-3 font-weight-normal text-center">Social network</h1>
                        <label className="sr-only" htmlFor="username">Username</label>
                        <input className="form-control mt-3" 
                            type="text" 
                            placeholder ="Username" 
                            name="username"
                            onChange={this.onChange}
                            value={this.state.username}
                        />

                        <label className="sr-only" htmlFor="inputBiographie">BIographie</label>
                        <input className="form-control mt-3" 
                            type="text" 
                            placeholder="Decrivez-vous !" 
                            name="bio"
                            onChange={this.onChange}
                            value={this.state.bio} 
                        />
                        <label className="sr-only" htmlFor="email">Adresse email</label>
                        <input className="form-control mt-3" 
                            type="email" 
                            placeholder ="Address@email.com" 
                            name="email" 
                            onChange={this.onChange}
                            value={this.state.email}
                        />
                        <label className="sr-only" htmlFor="inputPassword">Password</label>
                        <input className="form-control mt-3" 
                            type="password"
                            placeholder="Password" 
                            name="password"
                            onChange={this.onChange}
                            value={this.state.password} 
                        />

                        <button 
                        className="btn btn-lg btn-outline-success btn-block mt-3" 
                        type="submit" 
                        >
                            S'enregistrer ! 
                        </button>
                        <p className="mt-3 mb-3 text-muted text-center">@Groupomania 2020</p>
                    </form>
                    </div>
                    <div className="linkContainer">
                        <Link className="SimpleLink" to="/login">Déja inscrit !!!</Link>
                    </div>
            </div>  
        )
    }
}