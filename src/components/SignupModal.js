import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-materialize';
import { withRouter} from "react-router-dom";

class SignupModal extends Component {
  state = {
    name: '',
    nationality: '',
    email: '',
    phone: '',
    password: ''
  }

  createUser = event => {
    event.preventDefault()
    fetch('http://localhost:3000//api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        nationality: this.state.nationality,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password
      })
    })
    .then(r => r.json())
    .then(newUser => this.addNewUser(newUser))
    this.props.history.push('/add-categories')
  }

  addNewUser =(newUser) => {
    this.props.setCurrentUser(newUser)
    let users = [...this.props.users, newUser]
    this.props.loadusers(users)
  }


  render(){
    return (
      <div className="signup-form">

        <form onSubmit={event => this.createUser(event)}>
          <input type="text" placeholder="name" onChange={event => this.setState({name: event.target.value})}/>
          <input type="text" placeholder="nationality" onChange={event => this.setState({nationality: event.target.value})}/>
          <input type="text" placeholder="email" onChange={event => this.setState({email: event.target.value})}/>
          <input type="tel" placeholder="phone" onChange={event => this.setState({phone: event.target.value})}/>
          <input type="password" placeholder="password" onChange={event => this.setState({password: event.target.value})}/>
          <Button type="submit" placeholder="Make Account"> Make Your Account</Button>
        </form>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  toggleSignupModal: () => ({type: 'TOGGLESIGNUPMODAL'}),
  setCurrentUser:  (user) => ({type: 'SETCURRENTUSER', user}),
  loadusers: (users) => ({type: 'LOADUSERS', users}),
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupModal));
