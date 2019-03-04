import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import RestaurantsContainer from './components/RestaurantsContainer'
import NavBar from './components/NavBar'
import SelectedRestaurant from './components/SelectedRestaurant'
import SignupModal from './components/SignupModal'
import Category from './components/Category'
import UsersContainer from './components/UsersContainer'
import ViewedUser from './components/ViewedUser'
import { Route, withRouter} from "react-router-dom"


class App extends Component {

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/restaurants')
    .then(r => r.json())
    .then(restaurantsData => this.loadRestaurantAndSetCurrentRestaurant(restaurantsData))

    fetch('http://localhost:3000/api/v1/categories')
    .then(r => r.json())
    .then(categories => this.props.loadcategetories(categories))

    fetch('http://localhost:3000/api/v1/users')
    .then(r => r.json())
    .then(users => this.loadUsersAndSetViewedRestaurant(users) )
  }

  loadRestaurantAndSetCurrentRestaurant = (data) => {
    this.props.loadrestaurant(data)
    let pathSlug = this.props.history.location.pathname.split('/')[2]
    let beforeSlug = this.props.history.location.pathname.split('/')[1]
    if(pathSlug !== undefined && (beforeSlug === 'restaurants')){
      let selectedRestaurant = data.find(restaurant => {
        return restaurant.slug === pathSlug})
        this.props.setCurrentRestaurant(selectedRestaurant)
    }
  }

  loadUsersAndSetViewedRestaurant = data => {
    this.props.loadusers(data)
    let userId = this.props.history.location.pathname.split('/')[2]
    let beforeId = this.props.history.location.pathname.split('/')[1]
    if(userId !== undefined && (beforeId === 'users')){
      let selectedUser = data.find( user => {
        return user.id === parseInt(userId)
      })
      this.props.setViewedUser(selectedUser)
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <NavBar />
        <Route exact path="/restaurants" component={RestaurantsContainer} />
        <Route path="/restaurants/:slug" component={SelectedRestaurant}/>
        <Route exact path="/signup" component={SignupModal}/>
        <Route exact path="/add-categories" component={Category}/>
        <Route exact path="/users" component={UsersContainer} />
        <Route path="/users/:id" component={ViewedUser} />
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
    loadcategetories: (categories) => ({type: 'LOADCATEGORIES', categories}),
    loadusers: (users) => ({type: 'LOADUSERS', users}),
    setViewedUser: (inputUser) => ({type: 'SETVIEWEDUSER', inputUser})

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
