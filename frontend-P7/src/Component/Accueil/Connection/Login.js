/**
 * @author j.boero
 * 
 * 
 * Composant qui affiche la page de connexion utilisateur
 * 
 */
import React, { Component } from 'react';
import LogoGroup from './bigLogoRed.png';


export default class LoginUser extends Component {
    state = {
        email: '',
        password: '',
        items: []
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
        console.log( ">>> avant requete => " + userLogin.email)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer {{token}}");
        myHeaders.append("Content-Type", "application/json");

        // const urlencoded = new URLSearchParams();
        // urlencoded.append("email", userLogin.email);
        // urlencoded.append("password", userLogin.password);

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(userLogin),
        redirect: 'follow'
        };

        fetch("http://localhost:4200/api/user/login", requestOptions)
        .then(response => {
            // console.log(response.status);
            return response.json();
        })
        .then(json => {
            console.log(json);  
        })
        .catch(error => console.log('error', error));
            }

    render() {
        return (
            
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

                    <button className="btn btn-lg btn-outline-success btn-block mt-3" type="submit" >se connecter !</button>

                    <p className="mt-3 mb-3 text-muted text-center">@Groupomania 2020</p>
                </form>
            </div>  
        )
    }
}