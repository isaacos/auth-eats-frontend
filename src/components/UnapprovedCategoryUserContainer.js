import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import UnapprovedCategoryUser from "./UnapprovedCategoryUser"


class UnapprovedCategoryUserContainer extends Component {


  render(){
    console.log(this.props)
    return(
      <div className="right">
      {this.props.unapprovedCategoryUser.map(category_user => {
        return <UnapprovedCategoryUser key={category_user.id} category_user={category_user} />
      })}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {



}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnapprovedCategoryUserContainer));