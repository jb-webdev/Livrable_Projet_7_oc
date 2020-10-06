/**
 * @author j.boero
 * 
 * Compo App
 * Composant principale de l'application
 * contient le router des pages
 */


import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from'react-router-dom';
import Navigation from './Component/Navigation/Navigation';
import SignupUser from './Component/Connection/Signup'
import LoginUser from './Component/Connection/Login';
import User from './Component/User';
import ErrorPage from './Component/ErrorPage/ErrorPage';
import Spinner from './Component/Connection/Spinner'

import {UserContext} from './Component/Connection/UserContext'

class  App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        user : {},
        constPages : {
          Accueil : false,
          User : false,
        }
      }
      // this.changeUser.bind(this)
    }
    changeUser =  (user) => {
      console.log(this)
      this.setState({
        user:user,
      });
    }
    
  render(){
      return (
        <div className="Container">
            <Router>

              <UserContext.Provider value={this.state.user} >

                <Navigation changeUser={this.changeUser}/>
                <Switch>
                      <Route path="/" exact component={() => <SignupUser changeUser={this.changeUser} /> } />
                      <Route path="/login" exact component={() => <LoginUser changeUser={this.changeUser} />} />
                      <Route path="/user" exact component={() => <User value={this.state.user} />}/>
                      <Route path="/chargement" exact component={Spinner} />
                      <Route path="/error" exact component={ErrorPage} />
                      <Route component={ErrorPage} />
                </Switch>

              </UserContext.Provider >

            </Router>
        </div>
      );
    }
  }
  export default App;
