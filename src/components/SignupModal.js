import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    .then(newUser => this.props.setCurrentUser(newUser))
    this.props.toggleSignupModal()
  }


  render(){
    return (
      <div className={this.props.signupModal ? "modal" : "hidden"}>
        <form onSubmit={event => this.createUser(event)}>
          <input type="text" placeholder="name" onChange={event => this.setState({name: event.target.value})}/>
          <input type="text" placeholder="nationality" onChange={event => this.setState({nationality: event.target.value})}/>
          <input type="text" placeholder="email" onChange={event => this.setState({email: event.target.value})}/>
          <input type="tel" placeholder="phone" onChange={event => this.setState({phone: event.target.value})}/>
          <input type="password" placeholder="password" onChange={event => this.setState({password: event.target.value})}/>
          <input type="submit" placeholder="Make Account" />
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
  setCurrentUser:  (user) => ({type: 'SETCURRENTUSER', user})
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);
