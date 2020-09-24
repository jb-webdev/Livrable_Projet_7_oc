/**
 * @author j.boero
 * Licence
 * Exemple Cycle de vie Composant React
 */
import React ,{Component} from 'react';

class CompoCycleDeVie extends Component {
    constructor(props){
        super(props);
        console.log("Je passe dans le constructor"); //où sans constructeur en déclarant le state avant le render
    }
    


    render(){
        
        console.log("Je passe dans le render");
        return (
            <div>
            </div>
        )
    }
    
    // ATTENTION on sort du render
    componentDidMount(){
        console.log("Je passe dans le componentDidMount");
    }
    componentWillReceiveProps(){
        console.log("Je passe dans le componentWillReceiveProps");
    }
    shouldComponentUpdate(){
        console.log("Je passe dans le shouldComponentUpdate");
    }
    componentWillUpdate(){
        console.log("Je passe dans le componentWillUpdate");
    }
    componentDidUpdate(){
        console.log("Je passe dans le componentWillUpdate");
    }

}


export default CompoCycleDeVie;