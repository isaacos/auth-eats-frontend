import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore} from 'redux'
import {BrowserRouter as Router } from "react-router-dom"



const reducer = ( state = {restaurants: [], categories: [], users: [], searchTypeTerm: '', currentRestaurant: null, currentUser: null, viewedUser: null, signupModal: false}, action ) => {
  switch(action.type){
    case 'LOADRESTAURANTS':
      return {...state, restaurants: action.restaurants}
    case 'LOADCATEGORIES':
      return {...state, categories: action.categories}
    case 'LOADUSERS':
      return {...state, users: action.users}
    case 'SEARCHTYPECHANGE':
      return {...state, searchTypeTerm: action.inputString  }
    case 'SETCURRENTRESTAURANT':
      return {...state, currentRestaurant: action.inputRestaurant}
    case 'SETCURRENTUSER':
      console.log(action.user)
      if(action.user.error){
        alert('There was an issue with your login! Please try again')
        return {...state, currentUser: null}
        }
      return {...state, currentUser: action.user}
    case 'LOGOUT':
      return {...state, currentUser: null}
    case 'ADDREVIEW':
      return {...state, currentRestaurant: action.currentRestaurantWithReview}
    case 'TOGGLESIGNUPMODAL':
      return {...state, signupModal: !state.signupModal}
    case 'SETVIEWEDUSER':
      return {...state, viewedUser: action.inputUser }
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
