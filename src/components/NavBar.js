import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Link, NavLink, withRouter} from "react-router-dom"

class NavBar extends Component {

  state = {
    email: '',
    password: ''
  }

  login = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000//api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => this.props.setCurrentUser(data))
  }

  render () {
    return(
      <div>
      <a onClick={() => {(this.props.history.push('/restaurants'))}}> Home</a>
      <input type="text" onChange={(event) => this.props.searchInput(event.target.value)}/>
      <input type="text"/>
      <a>Login</a>
      <a onClick={() => this.props.toggleSignupModal()}>Signup</a>
      <form onSubmit={event => this.login(event)}>
        <input type='text' placeholder="email" onChange={event => this.setState({email: event.target.value})}/>
        <input type='password' placeholder="password" onChange={event => this.setState({password: event.target.value})}/>
        <input type='submit' placeholder='submit' />
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps =  {
  searchInput: (inputString) => ({type: 'SEARCHTYPECHANGE', inputString}),
  setCurrentUser:  (user) => ({type: 'SETCURRENTUSER', user}),
  toggleSignupModal: () => ({type: 'TOGGLESIGNUPMODAL'})

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
