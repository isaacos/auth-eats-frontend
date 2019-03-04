import React, { Component } from 'react';
import { connect } from 'react-redux';
import  ApprovedCategoryUser  from './ApprovedCategoryUser';
import UnapprovedCategoryUser from './UnapprovedCategoryUser';
import  ApprovedCategoryUserContainer  from './ApprovedCategoryUserContainer';
import  UnapprovedCategoryUserContainer  from './UnapprovedCategoryUserContainer';


class ViewedUser extends Component {

  approvedCategoryUser = () => {
    return this.props.viewedUser.category_user.filter(category_user => category_user.permission === true)
  }

  unapprovedCategoryUser = () => {
    return this.props.viewedUser.category_user.filter(category_user => category_user.permission === false)
  }

  render(){
    console.log(this.props.viewedUser)
    return(
      <div>
        {this.props.viewedUser ?
          <div>
            <h1>{this.props.viewedUser.name}</h1>
            <div>
              <ApprovedCategoryUserContainer approvedCategoryUser={this.approvedCategoryUser()}/>
              <UnapprovedCategoryUserContainer unapprovedCategoryUser={this.unapprovedCategoryUser()}/>

            </div>

          </div>
        :
          <div>
            loading...
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ViewedUser);
