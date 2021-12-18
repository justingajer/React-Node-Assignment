import logo from './logo.svg';

import 'antd/dist/antd.css';

import './App.css';
import Browser from './Browser.js'
import DefaultView from './DefaultView.js'
import Header from './Header.js'

import React from 'react';
import {Route, Routes} from 'react-router-dom';
//import ReactCSSTransitionGroup from '../node_modules/react-transition-group/CSSTransitionGroup.js';


class App extends React.Component {

  //const [searching, setSearching] = React.useState("");
  mounted=false;

  constructor(props) {
    super(props);
    this.state = {
      favorites: this.useLocalStorage("favorites") || [],
      allPlays: this.useLocalStorage("allPlays") || [],
      filters: this.useLocalStorage("filters") || {
        title: "",
        year: {
          before: "",
          after: "",
          selected: "before"
        },
        sorting: "title",
        genre: "",
        innerPlay: {
          act: "",
          scene: "",
          character: "",
          search: ""
        }
      },
      matchingPlays: this.useLocalStorage("matchingPlays") || [],
      focusedPlay: this.useLocalStorage("focusedPlay") || {},
      display: this.useLocalStorage("display") || {
        isFavoriteOpen: true,
        isDetailsOpen: false,
        detailsTabName: "details",
        isShowingAbout: false
      },
      serverLink: "https://young-badlands-04536.herokuapp.com"
    };
    setInterval(() => this.checkLocation(this.state), 500);
    //setInterval(() => {console.log(this.state)}, 5000);
  }

  checkLocation = (state) => {
    //console.log(window.location.pathname);
    //console.log("" + updatingDisplay["isDetailsOpen"] + ", " + window.location.pathname + ": " + updatingDisplay["isDetailsOpen"] != window.location.pathname)
    //console.log(state.display.isDetailsOpen);
    //console.log(window.location.pathname);
    //console.log(window.location.pathname === "/details");
    //console.log("> " + state.display.isDetailsOpen === (window.location.pathname === "/details"));
    
    if(!(state.display.isDetailsOpen) === (window.location.pathname === "/details")) {
      //console.log(state.display.isDetailsOpen)
      let updatingDisplay = {...this.state.display};
      updatingDisplay["isDetailsOpen"] = (window.location.pathname === "/details");

      updatingDisplay["isFavoriteOpen"] = false;
      //updatingDisplay["isDoneTransition"] = false;
      this.updateState("display", updatingDisplay);
      //updatingDisplay["isDoneTransition"] = true;
      //setTimeout(() => this.updateState("display", updatingDisplay), 1300);
    }
  }

  useLocalStorage = (varName, updateTo = null) => {
    //returns the value set in localstorage at the varname.
    // providing updateTo updates stored value and returns value of varName
    // not providing updateTo just returns value of varName
    //console.log("Looking at localStorage " + varName + ", " + ((updateTo) ? "Has Updates..." : "Not Updating..."));
    if(updateTo) {
      window.localStorage.setItem(varName, JSON.stringify(updateTo));
    }
    return JSON.parse(window.localStorage.getItem(varName));
  }
  


  updateState = (varName, updateTo) => {
    if(this.mounted === true) {
      //console.log(`inStateUpdate, updating ${varName} to:`);
      //console.log(updateTo);
      const updatingState = {...this.state};
      //console.log(updatingState);
      if(Array.isArray(varName)) {
        varName.forEach((v, index) => {
          updatingState[v] = updateTo[index];
          this.useLocalStorage(v, updateTo[index]);
        });
      } else {
        updatingState[varName] = updateTo;
        this.useLocalStorage(varName, updateTo);
      }
      this.setState(updatingState);
      //console.log("State updated to:");
      //console.log(updatingState);
    }
  }

  modifyFavorite = (favoriteId) => {
    let changedFavorites = [...this.state.favorites];
    //console.log(favoriteId);
    if(changedFavorites.find(f => f.id === favoriteId)) {
      //console.log("isDeleting!")
      let index = changedFavorites.findIndex(f => f.id === favoriteId);
      //console.log(index);
      //console.log(changedFavorites[index]);
      changedFavorites.splice(index, 1);
      //console.log(changedFavorites);
      this.updateState("favorites", changedFavorites);
    } else {
      //console.log("Current faves:");
      //console.log(changedFavorites);
      let newFavorite = this.state.allPlays.find(p => p.id === favoriteId);
      //console.log("New fave:");
      //console.log(newFavorite);
      changedFavorites.push(newFavorite)
      this.updateState("favorites", changedFavorites);
    }
    
        //
        //this.render();
  }

  useFilters = e => {
    console.log(e);
    let name = e.target.name || e.currentTarget.name || e.target.id || e.target.attributes.name.nodeValue;
    //console.log(name);
    console.log("filter change... " + name);
    let updatingFilters = {...this.state.filters};
    let toUpdate = true;
    switch(name) {
      case "title":
        updatingFilters["title"] = e.target.value;
        break;
      case "timeSelect":
        console.log("Updating timeSelect");
        if(e.target.value) {
          updatingFilters["year"]["selected"] = e.target.value;
        } else {
          updatingFilters["year"]["selected"] = e.target.parentElement.value;
        }    
        break;
      case "before":
        updatingFilters["year"]["before"] = e.target.value;
        break;
      case "after":
        updatingFilters["year"]["after"] = e.target.value;
        break;
      case "genre":
        updatingFilters["genre"] = e.target.value;
        break;
      case "search":
        this.updateMatching(updatingFilters);
        toUpdate = false;
        break;
        
      case "titleSort":
        updatingFilters["sorting"] = "title";
        this.updateMatching(updatingFilters);
        toUpdate = false;
        console.log("ordering by title...");
        break;
      case "dateSort":
        updatingFilters["sorting"] = "date";
        this.updateMatching(updatingFilters);
        console.log("ordering by date...");
        break;

      case "act":
        updatingFilters["innerPlay"]["act"] = e.target.value;
        break;
      case "scene":
        updatingFilters["innerPlay"]["scene"] = e.target.value;
        break;
      case "character":
        updatingFilters["innerPlay"]["character"] = e.target.value;
        break;
      case "searchInPlay":
        updatingFilters["innerPlay"]["search"] = e.target.value;
        break;

      default:
        //console.log("Clearing filters!")
        updatingFilters = {
          title: "",
          year: {
            before: "",
            after: "",
            selected: ""
          },
          sorting: "title",
          genre: "",
          innerPlay: {
            act: "",
            scene: "",
            character: "",
            search: ""
          }
        };
        this.updateMatching(updatingFilters);
        toUpdate = false;
        break;
    }
    if(toUpdate) {
      this.updateState("filters", updatingFilters);
    }
  }

  updateDisplay = e => {
    let name;
    console.log("updating display?");
    console.log(e);

    let updatingDisplay = {...this.state.display};

    try {
      //console.log("this works!");
      //console.log(typeof e);
      //console.log(e);
      //console.log("this works!");
      if(false) {
        /*
        console.log("string!");
        updatingDisplay["detailsTabName"] = e;
        console.log(updatingDisplay);
        */
      } else {
        name = e.target.name;
      }
    } catch(err) {
      this.updateState("focusedPlay", {
        playsInfo: "This play is currently unavailable.",
        playData: "This play is currently unavailable."
      }); 
      
      //this.handleBrokenPlay();
    }
    //console.log("clicked updateDisplay: " + name);
    
    //console.log(updatingDisplay);
    //let toUpdate = true;
    if(name) {
      switch(name) {
        case "favoriteToggle":
          updatingDisplay["isFavoriteOpen"] = !updatingDisplay["isFavoriteOpen"];
          break;
        case "gotoDetails":
          //updatingDisplay["isDetailsOpen"] = true;
          break;
        
        case "tabSwitch":
          updatingDisplay["detailsTabName"] = e.target.value;
          break;
        
        case "aboutOpen":
          console.log("Requesting open..."); 
          updatingDisplay["isShowingAbout"] = true;
          break;
        case "aboutClose":
          updatingDisplay["isShowingAbout"] = false;
          break;
        default:
          break;
      }
    }
    this.updateState("display", updatingDisplay);
  }

  checkIfFavorite = playId => {
    //console.log("IsFavorite: " + playId + "?");
    //console.log(this.state.favorites.find(f => f.id === playId));
    return this.state.favorites.find(f => f.id === playId);
  }

  updateMatching = filters => {

    //console.log("Updating filtered plays...");
    if(this.state.allPlays) {
      let matchedPlays = [...this.state.allPlays];

      //contains title?
      matchedPlays = matchedPlays.filter(p => p.title.toLowerCase().includes(filters.title.toLowerCase()));

      //correct year?
      if(filters.year.selected) {
        if(filters.year.selected === "before" && filters.year.before) {
          matchedPlays = matchedPlays.filter(p => p.likelyDate < filters.year.before);
        } else if(filters.year.after) {
          matchedPlays = matchedPlays.filter(p => p.likelyDate > filters.year.after);
        };
      };

      //correct genre?
      matchedPlays = matchedPlays.filter(p => p.genre.toLowerCase().includes(filters.genre.toLowerCase()));

      //sorting:
      matchedPlays = matchedPlays.sort(this.getSortingFunction(filters.sorting));

      //console.log("Updating filtered plays...");
      console.log(matchedPlays);

      setTimeout(() => {this.updateState(["matchingPlays", "filters"], [matchedPlays, filters]);}, 50);
    }
    
  }

  getSortingFunction = (sorting) => {
    if(sorting === "title") {
      return (
        function(a, b) {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        }
      )
    } else {
      return (
        function(a, b) {
          //console.log(a.likelyDate);
          return a.likelyDate - b.likelyDate;
        }
      )
    }
  }

  clickSetCurrentPlay = e => {
    console.log("setting current play:");
    console.log(e);
    const play = e.currentTarget.getAttribute("value");
    const currentPlay = this.state.allPlays.find(p => p.id === play);
    //console.log(play);
    
    //no longer:
    //const api = `https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php?name=${play}`;

    //now, API is:
    const api = `${this.state.serverLink}/api/play/${play}`;
    
    //console.log(api);
    fetch(api)
        .then(resp => resp.json())
        .then(data => {console.log(e); this.hasReceivedPlay(data, currentPlay, e);})
        .catch(e => {this.handleBrokenPlay()});
  }

  handleBrokenPlay = () => {
    this.updateState("focusedPlay", {
      playsInfo: "This play is currently unavailable.",
      playData: "This play is currently unavailable."
    }); 
    this.updateDisplay();
  }

  hasReceivedPlay = (dataIn, currentPlay, e) => {
    let data;
    try {
      console.log("Fetched this data:");
      console.log(dataIn);
      console.log(e);
  
      data = dataIn[0]["playText"];
      console.log("Got this data:");
      console.log(data);
      const testingActName = data["acts"][0].name;
    } catch(err) {
      data = {
        message: "Empty play data..."
      };
    }


    if(data.message) {
      //console.log("> " + data.message);
      this.handleBrokenPlay();
    } else {
      let updatingFilters = this.autofillInnerPlayFilters();

      this.updateState(["focusedPlay", "filters"], [{
        playsInfo: currentPlay,
        playData: data
      }, updatingFilters]); 
      console.log("Received play, updating display...");
      console.log(e);
      this.updateDisplay(e);
    }
  }

  autofillInnerPlayFilters = () => {
    let updatingFilters = {...this.state.filters};
    updatingFilters["innerPlay"] = {};
    updatingFilters["innerPlay"]["act"] = 0;
    updatingFilters["innerPlay"]["scene"] = 0;
    updatingFilters["innerPlay"]["character"] = "ALL PLAYERS";
    updatingFilters["innerPlay"]["search"] = "";
    return updatingFilters;
  }

  getIndexOfAct = (actName, playData) => {
    try {
      return playData.findIndex(act => act.name === actName);
    } catch(e) {
      return null;
    }
  }

  getAllGenres = () => {
    const allGenres = this.state.allPlays.map(p => p.genre);
    const uniqueGenres = [];
    allGenres.forEach(g => {
      const valueObject = { value: g };
      const currentUniques = [...uniqueGenres];
      let isUnique = true;

      for (const u of currentUniques) {
        if(u.value === g) {
          isUnique = false;
          break;
        }
      }
      if(isUnique) {
        uniqueGenres.push(valueObject);
      }
    });
    console.log(uniqueGenres);
    return uniqueGenres;
  }
  
  /*
  updateInput = e => {
    let name = e.currentTarget.name;
    switch(name) {
      case "search":
        this.updateState("searching", e.target.value);
        break;
      case "searchAll":
        this.updateState("searching", "");
        break;
      case "searchMatch":
        this.updateState("searching", e.target.value);
        break;
      case "favorite":

        break;
      default:
        break;
    }
    /*
    const updatedCompany = {...this.state.company};
    updatedCompany[name] = e.target.value;
    this.setState({company: updatedCompany});
    
  }
  */

  async componentDidMount() {
    this.mounted = true;
    if(this.useLocalStorage("allPlays")) {
      this.updateState("allPlays", this.useLocalStorage("allPlays"));
    } else {
      try{
        //no longer:
        //const api = "https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/list.php";

        //now, API is:
        const api = `${this.state.serverLink}/api/list`;

        fetch(api)
          .then(resp => resp.json())
          .then(data => {
            this.updateState("allPlays", data);
            this.useLocalStorage("allPlays", data);
          })
          .catch(e => console.error(e));
      } catch {
        console.error("OH NO FETCH DIED!");
      }
    }
  }

  //alert("searching: " + searching);
  render() {
    return (
      <div id="App">
        <Routes>
          <Route path="/" element={ 
            <Browser logo={logo} text={this.state.filters.title} update={this.useFilters}/>
          }/>

          <Route path="/home" element={
            <div>
              <Header logo={logo} updateDisplay={this.updateDisplay} isAboutOpen={this.state.display.isShowingAbout} serverLink={this.state.serverLink}/>
              <DefaultView logo={logo} 
                favorites={this.state.favorites} updateFavorites={this.modifyFavorite} 
                filters={this.state.filters} getGenres={this.getAllGenres} updateFilters={this.useFilters}
                searching={this.state.searching} 
                plays={this.state.matchingPlays} playIsFavorite={this.checkIfFavorite}
                update={this.updateInput}
                focusedPlay={this.state.focusedPlay} setCurrentPlay={this.clickSetCurrentPlay} autofillInnerPlayFilters={this.autofillInnerPlayFilters} getActIndex={this.getIndexOfAct}
                display={this.state.display}
                updateDisplay={this.updateDisplay}/> 
            </div>
          }/>

          <Route path="/details" element={
            <div>
              <Header logo={logo} updateDisplay={this.updateDisplay} isAboutOpen={this.state.display.isShowingAbout} serverLink={this.state.serverLink}/>
              <DefaultView logo={logo} 
                favorites={this.state.favorites} updateFavorites={this.modifyFavorite} 
                filters={this.state.filters} getGenres={this.getAllGenres} updateFilters={this.useFilters}
                searching={this.state.searching} 
                plays={this.state.matchingPlays} playIsFavorite={this.checkIfFavorite}
                update={this.updateInput}
                focusedPlay={this.state.focusedPlay} setCurrentPlay={this.clickSetCurrentPlay} autofillInnerPlayFilters={this.autofillInnerPlayFilters} getActIndex={this.getIndexOfAct}
                display={this.state.display}
                updateDisplay={this.updateDisplay}/> 
            </div>
          }/>
        </Routes>
      </div>
    );
  }
}
//<Route path="/home" exact component={DefaultView} />

/*

["/home", "/details"]
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
*/

export default App;