import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";


class User extends Component {

directToViewedUserPage = () => {
  this.props.setViewedUser(this.props.user)
  this.props.history.push(`/users/${this.props.user.id}`)
}


  render(){
    return(
      <div>
        <h3 onClick={() => this.directToViewedUserPage()}>
          {this.props.user.name}
        </h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  setViewedUser: (inputUser) => ({type: 'SETVIEWEDUSER', inputUser})
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
