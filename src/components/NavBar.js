import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import { Navbar, NavItem, Modal } from 'react-materialize';

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
      <Navbar>
        <NavItem onClick={() => {(this.props.history.push('/restaurants'))}}> Home</NavItem>
        <li><input type="text" onChange={(event) => this.props.searchInput(event.target.value)}/></li>

        {this.props.currentUser ?
          <a> {`Hello ${this.props.currentUser.name}`} </a>
          :
          <li>

            <a onClick={() => this.props.history.push('/signup')}>Signup</a>
            <a onClick={() => this.props.history.push('/users')}>View Users</a>
            <a onClick={() => this.props.history.push('/add-categories')}>Add Category</a>
            <form onSubmit={event => this.login(event)}>
              <input type='text' placeholder="email" onChange={event => this.setState({email: event.target.value})}/>
              <input type='password' placeholder="password" onChange={event => this.setState({password: event.target.value})}/>
              <input type='submit' placeholder='submit' />
            </form>
          </li>
        }
      </Navbar>
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
