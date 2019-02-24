import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import RestaurantsContainer from './components/RestaurantsContainer'
import NavBar from './components/NavBar'
import SelectedRestaurant from './components/SelectedRestaurant'
import {BrowserRouter as Router, Route, Link, NavLink, withRouter} from "react-router-dom"


class App extends Component {




  componentDidMount(){

    fetch('http://localhost:3000/api/v1/restaurants')
    .then(r => r.json())
    .then(data => this.props.loadrestaurant(data))
  }



  // restaurantsContainer = routerProps => <RestaurantsContainer {...routerProps}/>



  render() {
    console.log(this.props.SelectedRestaurant)
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <NavBar />
        <Route exact path="/restaurants" component={RestaurantsContainer} />
        <Route path="/restaurants/:slug" component={SelectedRestaurant}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps =  {

    loadrestaurant: (restaurants) => ({type: 'LOADRESTAURANTS', restaurants})

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
