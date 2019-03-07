import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';


class UnapprovedCategoryUser extends Component {

  getCategoryName = () => {
    const category = this.props.categories.find(category => category.id === this.props.category_user.category_id)
    return category.name
  }

  changePermissiontoTrue = () => {
    fetch(`http://localhost:3000/api/v1/category_users/${this.props.category_user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        category_id: this.props.category_user.category_id,
        user_id: this.props.category_user.user_id,
        description: this.props.category_user.description,
        permission: true
      })
    })
    .then(r => r.json())
    .then(category_user => this.updateViewedUser(category_user))
  }

  updateViewedUser = (newCategoryUser) => {
    let newCategoryUserList = this.props.viewedUser.category_user.map(category_user => {
      if(newCategoryUser.id === category_user.id){
        return newCategoryUser
      } else {
        return category_user
      }
    })
    let newViewedUser = {...this.props.viewedUser, category_user: newCategoryUserList }
    this.props.setViewedUser(newViewedUser)
    this.updateUsersList(newViewedUser)

  }

  updateUsersList = (newViewedUser) => {
      const newUsersList= this.props.users.map(user => {
        if(user.id === newViewedUser.id){
          return newViewedUser
        } else {
          return user
        }
      })
      this.props.loadusers(newUsersList)
  }

  updateViewedUserAndList = (newCategoryUser) => {
    this.updateViewedUser(newCategoryUser)
    this.updateUsersList()
  }

  displayButtonforCurrentUser = () => {
    if(this.props.currentUser){
      const sharedCategoryUser = this.currentUserSharedCategoryUser()
      if( (sharedCategoryUser !== undefined) && (sharedCategoryUser.permission === true) ){
        return   <Button onClick={() => this.changePermissiontoTrue()}> Approve this! </Button>
      }
    }
  }

  currentUserSharedCategoryUser = () => {
    return this.props.currentUser.category_user.find(cu => cu.category_id === this.props.category_user.category_id)
  }

  render(){
    return(
      <div>
        <h4> {this.getCategoryName()}</h4>
        <p> needs approval (as we all do)</p>
        {this.props.category_user.description}
        {this.displayButtonforCurrentUser()}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  setViewedUser: (inputUser) => ({type: 'SETVIEWEDUSER', inputUser}),
  loadusers: (users) => ({type: 'LOADUSERS', users})
}

export default connect(mapStateToProps, mapDispatchToProps)(UnapprovedCategoryUser);
