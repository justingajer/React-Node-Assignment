import './FavoriteResize.css'; 
import React from 'react';

//import {Link} from 'react-router-dom';

class FavoriteResize extends React.Component {
    /*
    constructor(props) {
        super(props);

    }
    */

    removeFavorite = () => {
        this.props.updateFavorite(
            this.props.id
        );
    }

    render() {

        const label = (this.props.isOpen) ? "◄" : "►"; 
  

        return (
        <button className="button favoriteToggle" name="favoriteToggle" onClick={this.props.update}>
            {label}
        </button>       
        );
    }
}

//value={this.props.play} 

export default FavoriteResize;
