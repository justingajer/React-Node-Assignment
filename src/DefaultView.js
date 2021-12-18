import React from 'react';
import './DefaultView.css';
import FavoritesBar from './FavoritesBar.js';
import Filters from './Filters.js';
import FilteredPlays from './FilteredPlays.js'
import PlayDetails from './PlayDetails';
import PlayFocused from './PlayFocused';


class DefaultView extends React.Component {

    render() {
        //console.log(this.props.plays)
        // && this.props.display.isDoneTransition
        if(this.props.display.isDetailsOpen) {
            return (
                <div id="defaultView">
                    <FavoritesBar favorites={this.props.favorites} update={this.props.updateFavorites} setCurrentPlay={this.props.setCurrentPlay} display={this.props.display} show={this.props.updateDisplay}/>
                    <div id="contentContainer">
                        <Filters display={this.props.display} filters={this.props.filters} getGenres={this.props.getGenres} update={this.props.updateFilters} />
                        <FilteredPlays display={this.props.display} filteredPlays={this.props.plays} checkFavorite={this.props.playIsFavorite} updateFavorites={this.props.updateFavorites} setCurrentPlay={this.props.setCurrentPlay} filters={this.props.filters} updateFilters={this.props.updateFilters}/>
                        <PlayFocused display={this.props.display} playData={this.props.focusedPlay} getActIndex={this.props.getActIndex} checkFavorite={this.props.playIsFavorite} updateFavorites={this.props.updateFavorites} filters={this.props.filters} updateFilters={this.props.updateFilters} autofillFilters={this.props.autofillInnerPlayFilters} />
                        <PlayDetails display={this.props.display} playData={this.props.focusedPlay} getActIndex={this.props.getActIndex} showTab={this.props.updateDisplay} filters={this.props.filters}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="defaultView">
                    <FavoritesBar favorites={this.props.favorites} update={this.props.updateFavorites} setCurrentPlay={this.props.setCurrentPlay} display={this.props.display} show={this.props.updateDisplay}/>
                    <div id="contentContainer">
                        <PlayFocused display={this.props.display} playData={this.props.focusedPlay} getActIndex={this.props.getActIndex} checkFavorite={this.props.playIsFavorite} updateFavorites={this.props.updateFavorites} filters={this.props.filters} updateFilters={this.props.updateFilters} autofillFilters={this.props.autofillInnerPlayFilters} />
                        <PlayDetails display={this.props.display} playData={this.props.focusedPlay} getActIndex={this.props.getActIndex} showTab={this.props.updateDisplay} filters={this.props.filters}/>
                        <Filters display={this.props.display} filters={this.props.filters} getGenres={this.props.getGenres} update={this.props.updateFilters} />
                        <FilteredPlays display={this.props.display} filteredPlays={this.props.plays} checkFavorite={this.props.playIsFavorite} updateFavorites={this.props.updateFavorites} setCurrentPlay={this.props.setCurrentPlay} filters={this.props.filters} updateFilters={this.props.updateFilters}/>
                    </div>
                </div>
            );
        }
    }
}

export default DefaultView;