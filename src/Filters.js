import React from 'react';
import './Filters.css';
//import Radio from './Radio.js';

import { Button, Input, Radio, AutoComplete } from 'antd';
//const { Option } = Select;

class Filters extends React.Component {

    genrePassEvent = (e) => {
        const pretendEvent = {
            target: {
                name: "genre",
                value: e
            }
        }
        this.props.update(pretendEvent);
    }


    render() {
        //console.log(this.props.plays)
        
        let isOpen = (!this.props.display.isDetailsOpen) ? "filters tc2" : "leftTwixClosed filters tc2";

        isOpen += " leftTwix";

        const genres = this.props.getGenres();


        return (
            <section className={isOpen}>
                <h2>Play Filters</h2>
                
                <Input addonBefore="Title: " id="title" style={{ width: '80%', marginLeft: '10%' }} value={this.props.filters.title} onChange={this.props.update}/>
                <br /><br />
                <Radio.Group onChange={this.props.update} name="timeSelect" value={this.props.filters.year.selected}>
                    <Input addonBefore="Year Before: " addonAfter={<div>Selected? <Radio value="before" /></div>} id="before" style={{ width: '80%', marginLeft: '10%', marginBottom: "24px" }} value={this.props.filters.year.before} onChange={this.props.update}/>
                    <Input addonBefore="Year After: " addonAfter={<div>Selected? <Radio value="after" /></div>} id="after" style={{ width: '80%', marginLeft: '10%' }} value={this.props.filters.year.after} onChange={this.props.update}/>
                </Radio.Group>
                <br /><br />
                <span className="ant-input-group-wrapper addonBeforeSpecial">
                    <span className="ant-input-wrapper ant-input-group">
                        <span className="ant-input-group-addon">Genre:
                        </span>
                        <AutoComplete
                            style={{ width: '100%'}}
                            onChange={this.genrePassEvent}
                            value={this.props.filters.genre}
                            options={
                                genres
                                
                            }
                        />
                    </span>
                </span>

                <div className="alignButtons">
                    <Button type="primary" size="default" shape="round" name="search" onClick={this.props.update}> Filter </Button> 
                    <div className='space'></div>
                    <Button size="default" shape="round" name="clear" onClick={this.props.update}> Clear </Button> 
                </div>
            </section>
        );
    }
}

/*

                <Input addonBefore="Genre: " id="genre" style={{ width: '80%', marginLeft: '10%' }} value={"Wow!"} onChange={this.props.update}/>

                <Input.Group compact>
                    <Input addonBefore="Genre: " id="genre" style={{ width: '100px', marginLeft: '10%' }}/>

                    
                </Input.Group>




                <h3>Title</h3>
                <input type="text" name="title" value={this.props.filters.title} onChange={this.props.update}/>

                <h3>Year</h3>
                <div className="yearData">
                    <Radio value="before" isSelected={this.props.filters.year.selected === "before"} click={this.props.update}/> <p>Before:</p>
                        <input type="text" name="before" value={this.props.filters.year.before} onChange={this.props.update}/>
                    <br />
                    <Radio value="after" isSelected={this.props.filters.year.selected === "after"} click={this.props.update}/> <p>After:</p>
                        <input type="text" name="after" value={this.props.filters.year.after} onChange={this.props.update}/>
                </div>
                                <h3>Genre</h3>
                <input type="text" name="genre" value={this.props.filters.genre} onChange={this.props.update}/>
                <br /><br />

                    <button className="button" name="search" onClick={this.props.update}> Filter </button> 
                    <button className="button" name="clear" onClick={this.props.update}> Clear </button> 

*/

export default Filters;