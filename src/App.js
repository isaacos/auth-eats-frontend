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
    .then(data => this.setState({restaurants: data}))
  }



  render() {

    return (
      <div className="App">
        <header className="App-header">
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
        </header>
        <NavBar />
        <RestaurantsContainer restaurants={this.state.restaurants}/>
      </div>
    );
  }
}

export default App;
