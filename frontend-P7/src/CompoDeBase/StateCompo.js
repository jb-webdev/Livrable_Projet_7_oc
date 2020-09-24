/**
 * @author j.boero
 * Licence
 * EXEMPLE State Compo avec un evenement
 */

import React ,{Component} from 'react';
import './StateCompo.css' // on import du css de cette manière

class StateCompo extends Component {
    // Attention on peut faire sans le constructeur maintenant
    constructor(props){
        super(props);
        //console.log("label " + props.label)
        this.state = {nom : ''};
        // il ne faut pas oublier de binder le this si on n'utilise pas des fonctions fléchées
        //this.handleChange = this.handleChange.bind(this)
    }
    /*handleChange(e){
        console.log("Je passe ici")
        this.setState({nom : "Le nouveau"});
    }*/
    handleChange = (e) => {
        console.log("value dans COMPO  " + e.target.value)
        this.setState({nom : e.target.value});
        this.props.onInputChange(e.target.value);
    } 

    render(){
        return (
            <div>
                <h6 className="state-h6">Compo State {this.props.label}</h6> 
                <input type="text" value={this.state.nom} onChange={this.handleChange}></input>

            </div>
        )
    }
}
export default StateCompo;