import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

import Modal from 'react-modal'; 

import { Button } from 'antd';

class Header extends React.Component {

    askModal = (e) => {
        e.target.name = "aboutOpen";
        this.props.updateDisplay(e)
    }

    render() {
        //console.log("Header props: ");
        //console.log(this.props);
        //console.log("Header props Done");

        return (
            <header className="App-header tc1">
                <div>
                    <Link className="logo" to="/" name="home" onClick={this.props.update}>
                        <img src={this.props.logo} alt="Logo" />
                    </Link>

                    <Button type="primary" size="default" shape="round" name="aboutOpen" onClick={this.askModal}>
                        About
                    </Button>
                    <div className='space'></div>
                    <Button size="default" shape="round" href={`${this.props.serverLink}/user`}>
                        User
                    </Button>
                    <div className='space'></div>
                    <Button size="default" shape="round" href={`${this.props.serverLink}/logout`}>Log Out</Button> 
                    <div className='space'></div>

                </div>
                <Modal isOpen={this.props.isAboutOpen}>
                    <button className="button" name="aboutClose" onClick={this.props.updateDisplay}>Close About</button>
                    
                    <h1><img src={this.props.logo} alt="Logo" className="modalLogo"/>Built with React, Beautified with Ant, Hosted on Heroku!</h1>
                    <h2>React Components and Resources Used:</h2>
                    <ul>
                        <li>react-modal: <a href="https://www.npmjs.com/package/react-modal">https://www.npmjs.com/package/react-modal</a></li>
                        <li>react-router-dom: <a href="https://www.npmjs.com/package/react-router">https://www.npmjs.com/package/react-router</a></li>
                        <ul>
                            <li>Upgrading to V6 guide used: <a href="https://reactrouter.com/docs/en/v6/upgrading/v5">https://reactrouter.com/docs/en/v6/upgrading/v5</a></li>
                        </ul>
                        <li>react-highlight-words: <a href="https://www.npmjs.com/package/react-highlight-words">https://www.npmjs.com/package/react-highlight-words</a></li>
                    </ul>
                    <h2>Ant Components and Resources Used:</h2>
                    <ul>
                        
                        <li>Button: <a href="https://ant.design/components/button/">https://ant.design/components/button/</a></li>
                        <li>Input: <a href="https://ant.design/components/input/">https://ant.design/components/input/</a></li>
                        <li>Radio: <a href="https://ant.design/components/radio/">https://ant.design/components/radio/</a></li>
                        <li>AutoComplete: <a href="https://ant.design/components/auto-complete/">https://ant.design/components/auto-complete/</a></li>
                        <li>Menu: <a href="https://ant.design/components/menu/">https://ant.design/components/menu/</a></li>
                        <li>Dropdown: <a href="https://ant.design/components/dropdown/">https://ant.design/components/dropdown/</a></li>
                        <li>Tabs: <a href="https://ant.design/components/tabs/">https://ant.design/components/tabs/</a></li>
                        <li>Icons: <a href="https://ant.design/components/icon/">https://ant.design/components/icon/</a></li>
                        <li>Ant.css</li>
                    </ul>
                    <h2>Built By:</h2>
                    <ul>
                        <li><h3>Justin Gajer</h3><a href="https://github.com/justingajer">https://github.com/justingajer</a></li>
                        <li><h3>Mihai Popa</h3><a href="https://github.com/Imroboboy">https://github.com/Imroboboy</a></li>
                    </ul> 
                </Modal>
            </header>
        );
    }
}

/*
                    <button className="button" name="aboutOpen" onClick={this.props.updateDisplay}>
                        About
                    </button> 
*/

export default Header;