import favoriteLogo from './favoriteStar.svg';
import favoriteLogoAdd from './favoriteStarAdd.svg';
import './FavoriteButton.css'; 
import React from 'react';

//import {Link} from 'react-router-dom';

class FavoriteLabel extends React.Component {

    render() {
        //if()
        const image = (this.props.isFavorite) ? <img src={favoriteLogoAdd} className="favoriteLabel" alt="Favorite" /> : <img src={favoriteLogo} className="favoriteLabel" alt="Unfavorite" />

        return (image);
    }
}

//value={this.props.play} 

export default FavoriteLabel;
