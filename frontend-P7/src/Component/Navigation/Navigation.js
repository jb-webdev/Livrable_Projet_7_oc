/**
 * @author j.boero
 * 
 * Compo Navigation
 * Affiche la NavBar 
 */
import React from 'react';
import {Link} from 'react-router-dom';
import LogoRed from "./logoWhite.png";


function Navigation() {
    return (
        <div className="navbar navbar-expand-lg" style={{backgroundColor: "#091f43"}}>
            <Link className="navbar-brand" to="/"><img src={LogoRed} alt="logo groupomania" style={{height: "50px"}} /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
    )
}
export default Navigation;

