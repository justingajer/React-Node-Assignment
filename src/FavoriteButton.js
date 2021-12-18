import favoriteLogo from './favoriteStar.svg';
import favoriteLogoAdd from './favoriteStarAdd.svg';
import './FavoriteButton.css'; 
import React from 'react';

import { Button } from 'antd';
import {HeartTwoTone} from '@ant-design/icons';

//import {Link} from 'react-router-dom';

class FavoriteButton extends React.Component {
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
        console.log(this.props.isFavorite);

        const image = (this.props.isFavorite) ? <HeartTwoTone twoToneColor="#eb2f96" /> : <HeartTwoTone twoToneColor="#7d6171" />
        const label = (this.props.isFavorite) ? "Del" : "Add";
        //const label = "";

        if(typeof this.props.id !== 'undefined') {
            return (
                <div className="favorite">
                    <Button size="default" shape="round" icon={image} onClick={this.removeFavorite}>
                        {label}
                    </Button> 
                </div>
            );
        } else {
            return (
                <div className="favorite">
                    <Button disabled size="default" shape="round" icon={image} onClick={this.removeFavorite}>
                        {label}
                    </Button> 
                </div>
            );
        }

    }
}

/*
            <button className="button favorite" name="favorite" onClick={this.removeFavorite}>
                {image}{label}
            </button> 
*/

//value={this.props.play} 

export default FavoriteButton;
