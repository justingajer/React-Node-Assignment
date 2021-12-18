import React from 'react';

class Radio extends React.Component {

    render() {

        if(this.props.isSelected) {
            return (
                <button className="radio radioSelect" name="timeSelect" value={this.props.value} onClick={this.props.click} >
                    <div> </div>
                </button>
            );
        } else {
            return (
                <button className="radio" name="timeSelect" value={this.props.value} onClick={this.props.click} >
                    <div> </div>
                </button>
            );
        }

    }
}

export default Radio;