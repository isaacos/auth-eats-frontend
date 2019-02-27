import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore} from 'redux'
import {BrowserRouter as Router } from "react-router-dom"



const reducer = ( state = {restaurants: [], searchTypeTerm: '', currentRestaurant: null, currentUser: null, signupModal: false}, action ) => {
  switch(action.type){
    case 'LOADRESTAURANTS':
      return {...state, restaurants: action.restaurants}
    case 'SEARCHTYPECHANGE':
      return {...state, searchTypeTerm: action.inputString  }
    case 'SETCURRENTRESTAURANT':
      return {...state, currentRestaurant: action.inputRestaurant}
    case 'SETCURRENTUSER':
      return {...state, currentUser: action.user}
    case 'ADDREVIEW':
      return {...state, currentRestaurant: action.currentRestaurantWithReview}
    case 'TOGGLESIGNUPMODAL':
      return {...state, signupModal: !state.signupModal}
    default:
      return state
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
