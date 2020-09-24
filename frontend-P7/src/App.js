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
import Accueil from './Component/Accueil/Accueil'
// import User from './Component/User'
import ErrorPage from './Component/ErrorPage/ErrorPage';




class  App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        constPages : {
          Accueil : false,
          User : false,
        }
      }
    }

  

  
 
  render(){
    
      return (
        <div className="Container">
          
            <Router>

              <Navigation />

              <Switch>

                <Route exact path="/" component={Accueil} />
                {/* <Route exact path="/user" component={User} /> */}


                {/* <Route exact path="/user" render={()=>(
                    this.state.constPages.false ? ( <Redirect to="/" />) : (<User /> )
                )} /> */}
                
                <Route component={ErrorPage} />
              
              </Switch>

            </Router>
          
          
          
        </div>
      );
    }
  }
  export default App;
  
 

// {/* <Router>
//               <Navigation />
//               <Switch>
//                 <Route path='/' component={Accueil} />
//                 {/* <Route exact path="/" render={()=> (
//                   this.state.userConnect.Accueil ? (<Redirect to="/user"/>) : (<Accueil />)
//                 ) } /> */}
            //     <Route path="/user" component={User} />
            //     <Route component ={ErrorPage} />
            //   </Switch>
            // </Router> */}