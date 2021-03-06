/**
 * @author j.boero
 * 
 * Composant qui affiche la page de connexion login utilisateur
 * 
 */
import React, { Component } from 'react';
import LogoGroup from './bigLogoRed.png';
import {Link, Redirect} from'react-router-dom';

export default class LoginUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            connectStatus : 1,
            email: '',
            password: '',
            items: [],
            responseStatus: false,
        }   
    }
    
    // on écoute le changement de valeur dans les inputs
    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            email: '',
            password: '',
            items: [...this.state.items, {email: this.state.email, password: this.state.password}]
        });
        const userLogin = {
            email: this.state.email,
            password: this.state.password,               
        }; 
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(userLogin),
            redirect: 'follow'
        };
        
        fetch("http://localhost:4200/api/user/login", requestOptions)
        .then(response => {
            console.log(response.status)
            if (response.status !== 200){
                console.log("different de 200 .....!")
                // this.props.history.push('/error')
                // alert("Connection impossible ! veuillez verifier vos identifiants !")
            }else {
                this.setState({
                    responseStatus : true,
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
            
            <div>
            {this.state.responseStatus ? (<Redirect to="/user" />) : (null)}
                <div className="row justify-content-center">
                    
                    <form onSubmit={this.onSubmit}>
                        <img className="form  mt-5" src={LogoGroup} alt="logo groupomania" style={{ height: "150px"}} />
                    
                        <h1 className="h3- mt-3 mb-3 font-weight-normal text-center">Social network</h1>

                        <label className="sr-only" htmlFor="email">Adresse email</label>
                        <input className="form-control mt-3" 
                            type="email" 
                            placeholder ="Address@email.com" 
                            name="email" 
                            onChange={this.onChange}
                            value={this.state.email}
                        />

                        <label className="sr-only" htmlFor="password">Password</label>
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
                            se connecter !
                        </button>

                        <p className="mt-3 mb-3 text-muted text-center">@Groupomania 2020</p>
                        
                    </form>
                    
                </div>
                <div className="linkContainer">
                    <Link className="SimpleLink" to="/"> inscription !</Link>
                    </div>
            </div>  
        )
    }
}