
import './Browser.css';
import React from 'react';
import {Link} from 'react-router-dom';

import { Button, Input } from 'antd';

class Browser extends React.Component {
    /*
    constructor(props) {
        super(props);

    }
    */

    render() {
        return (
            <div id="Browser">
                <img className="hero" src={this.props.logo} alt="Background" />
                <div id="browserSearch">
                    <h1>Play Browser</h1>
                    <Input addonBefore="Title: " id="title" style={{ width: '100%' }} value={this.props.text} onChange={this.props.update}/>
                    <br />
                    <br />
                    <Button type="primary" size="default" shape="round">
                        <Link to="/home" name="search" onClick={this.props.update}>Show Matching Plays</Link>
                    </Button> 
                    <Button size="default" shape="round">
                        <Link to="/home" name="clear" onClick={this.props.update}>Show All Plays</Link>
                    </Button> 
                </div>
            </div>
          );
    }
}

/*

                    <label className="textInput" >Title:
                        <input type="text" name="title" value={this.props.text} onChange={this.props.update}/>  
                    </label>

                    <button className="button">
                        <Link to="/home" name="search" onClick={this.props.update}>Show Matching Plays</Link>
                    </button> 
                    <button className="button">
                        <Link to="/home" name="clear" onClick={this.props.update}>Show All Plays</Link>
                    </button> 
*/

export default Browser;