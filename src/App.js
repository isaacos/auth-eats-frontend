import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import RestaurantsContainer from './components/RestaurantsContainer'
import NavBar from './components/NavBar'

class App extends Component {
  state = {
  restaurants: {}
}



  componentDidMount(){

    fetch('http://localhost:3000/api/v1/restaurants')
    .then(r => r.json())
    .then(data => this.props.loadrestaurant(data))
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <NavBar />
        <RestaurantsContainer/>
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


export default connect(mapStateToProps, mapDispatchToProps)(App);
