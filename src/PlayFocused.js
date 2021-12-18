import React from 'react';
import './PlayFocused.css';
import {Link} from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

import { Button, Menu, Dropdown, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';

class PlayFocused extends React.Component {

    createSelectMenu = (name, propertyName, data, selectedDefault, extra = "") => {

        console.log(name);

        //console.log("I am alive!");
        let extraOption = (extra) ? <Menu.Item key={name + "~!~" + extra}>{extra}</Menu.Item> : "";

        let menu;

        if(name === "character") {
            //console.log(data);

            menu = (
                <Menu onClick={this.updateFilters}>
                    {extraOption}
                    {data.map( (opt, index) => {
                        return (<Menu.Item key={name + "~!~" + opt[propertyName]}>{opt[propertyName]}</Menu.Item>);
                    })}
                </Menu>
            );

            /*

                              <Menu.Item key="1" icon={<UserOutlined />}>
                    1st menu item
                  </Menu.Item>
                  <Menu.Item key="2" icon={<UserOutlined />}>
                    2nd menu item
                  </Menu.Item>
                  <Menu.Item key="3" icon={<UserOutlined />}>
                    3rd menu item
                  </Menu.Item>

                <option key={opt[propertyName]} value={opt[propertyName]}>{opt[propertyName]}</option>

                <Input addonBefore="Title: " id="title" style={{ width: '80%', marginLeft: '10%' }} value={this.props.filters.title} onChange={this.props.update}/>

                <select key={name + "Select"} name={name} value={selectedDefault} onChange={this.props.updateFilters}>
                    {extraOption}
                    {data.map( (opt, index) => {
                        return (<option key={opt[propertyName]} value={opt[propertyName]}>{opt[propertyName]}</option>);
                    })}
                </select>
            */

            //console.log(toReturn);

            return (
                <Dropdown overlay={menu}>
                    <Button>
                        {selectedDefault} <DownOutlined />
                    </Button>
                </Dropdown>
            );
            
        } else {
            //console.log(data);

            menu = (
                <Menu onClick={this.updateFilters}>
                    {extraOption}
                    {data.map( (opt, index) => {
                        return (<Menu.Item key={name + "~!~" + index}>{opt[propertyName]}</Menu.Item>);
                    })}
                </Menu>
            );
            
            /*
            const toReturn = (
                <select key={name + "Select"} name={name} value={selectedDefault} onChange={this.props.updateFilters}>
                    {extraOption}
                    {data.map( (opt, index) => {
                        return (<option key={opt[propertyName]} value={index}>{opt[propertyName]}</option>);
                    })}
                </select>
            );
            //console.log(toReturn);
            return toReturn;
            */

            let displayNumber = parseInt(selectedDefault) + 1;

            //const displayName = name.substring(0, 1).toUpperCase() + name.substring(1) + " " + displayNumber;

            const displayName = data[0][propertyName].split(" ")[0] + " " + displayNumber;

            return (
                <Dropdown overlay={menu}>
                    <Button>
                        {data[parseInt(selectedDefault)][propertyName]} <DownOutlined />
                    </Button>
                </Dropdown>
            );
        }
    }

    updateFilters = (e) => {
        console.log(e);
        const dataArray = e.key.split("~!~");
        const pretendEvent = {
            target: {
                name: dataArray[0],
                value: dataArray[1]
            }
        }
        this.props.updateFilters(pretendEvent);
    }

    render() {
        //console.log(this.props)

        const info = this.props.playData.playsInfo;
        const data = this.props.playData.playData;

        if(info && data) {
            let isOpen = (this.props.display.isDetailsOpen) ? "playFocused tc5" : "leftTwixClosed playFocused tc5";

            isOpen += " leftTwix";

            let myContent;

            if(this.props.display.detailsTabName === "text") {

                //console.log(this.props.getActIndex(this.props.filters.innerPlay.act, data.acts));
                try {
                    console.log("Alive?");
                    myContent = (
                        <div>
                            {this.createSelectMenu("act", "name", data.acts, this.props.filters.innerPlay.act)}
                            <br /><br />
                            {this.createSelectMenu("scene", "name", data.acts[this.props.filters.innerPlay.act].scenes, this.props.filters.innerPlay.scene)}
                            <br /><br />
                            {this.createSelectMenu("character", "player", data.persona, this.props.filters.innerPlay.character, "ALL PLAYERS")}
                            <br /><br />
                            <Input addonBefore="Text: " id="searchInPlay" style={{ width: '80%', marginLeft: '10%' }} value={this.props.filters.innerPlay.search} onChange={this.props.updateFilters}/> 
                        </div>
                    );
                    //<input type="text" name="searchInPlay" value={this.props.filters.innerPlay.search} onChange={this.props.updateFilters} />
                } catch(e) {
                    if(info !== "This play is currently unavailable.") {
                        myContent = (
                            <div className="indent">
                                Loading...
                            </div>
                        );
                    } else {
                        myContent = (
                            <div className="indent"></div>
                        );
                    }

                }
                
            } else {
                myContent = (
                    <div className="indent">
                        <p>{info.synopsis}</p>
                    </div>
                );
            }

            return (
                <section className={isOpen}>
                    <h2 className="leftAlign">{data.title}</h2>
                    
                    {myContent}
                    
                    <div className="alignButtons">
                        
                        <Button size="default" shape="round">
                            <Link to="/home" name="gotoHome">Close</Link>
                        </Button> 
                        <div className='space'></div>
                        <FavoriteButton isFavorite={this.props.checkFavorite(info.id)} id={info.id} updateFavorite={this.props.updateFavorites}/> 
                    </div>
                </section>
            );
        } else {
            return (
                <section className="leftTwixClosed leftTwix playFocused tc5">
                    <h2 className="leftAlign">Loading...</h2>
                    <div className="indent">
                        <p>Loading...</p>
                    </div>
                    <div className="alignButtons">
                        <Button size="default" shape="round">
                            <Link to="/home" name="gotoHome">Close</Link>
                        </Button> 
                    </div>
                </section>
            );
        }
        
    }
}

/*
                        <Button type="primary" size="default" shape="round" name="search" onClick={this.props.update}> Filter </Button> 
                        <div className='space'></div>
                        <Button size="default" shape="round" name="clear" onClick={this.props.update}> Clear </Button> 
*/


export default PlayFocused;