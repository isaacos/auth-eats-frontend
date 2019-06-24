import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User';

class UsersContainer extends Component {

  render(){
    return(
      <div>
        {this.props.users.map(user => <User key={user.email} user={user}/>)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
