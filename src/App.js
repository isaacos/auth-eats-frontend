import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import RestaurantsContainer from './components/RestaurantsContainer'
import NavBar from './components/NavBar'
import SelectedRestaurant from './components/SelectedRestaurant'
import SignupModal from './components/SignupModal'
import Category from './components/Category'
import { Route, withRouter} from "react-router-dom"


class App extends Component {

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/restaurants')
    .then(r => r.json())
    .then(restaurantsData => this.loadRestaurantAndSetCurrentRestaurant(restaurantsData))

    fetch('http://localhost:3000/api/v1/categories')
    .then(r => r.json())
    .then(data => this.props.loadcategetories(data))
  }

  loadRestaurantAndSetCurrentRestaurant = (data) => {
    this.props.loadrestaurant(data)
    if(this.props.history.location.pathname.split('/')[2] !== undefined){
      let selectedRestaurant = data.find(restaurant => {
        return restaurant.slug === this.props.history.location.pathname.split('/')[2]})
        this.props.setCurrentRestaurant(selectedRestaurant)
    }
  }


  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <NavBar />
        <Route exact path="/restaurants" component={RestaurantsContainer} />
        <Route path="/restaurants/:slug" component={SelectedRestaurant}/>
        <Route exact path="/signup" component={SignupModal}/>
        <Route exact path="/add-categories" component={Category}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps =  {

    loadrestaurant: (restaurants) => ({type: 'LOADRESTAURANTS', restaurants}),
    setCurrentRestaurant: (inputRestaurant) => ({type: 'SETCURRENTRESTAURANT', inputRestaurant}),
    loadcategetories: (categories) => ({type: 'LOADCATEGORIES', categories})

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
