import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ApprovedCategoryUser from "./ApprovedCategoryUser"


class ApprovedCategoryUserContainer extends Component {


  render(){
    console.log(this.props)
    return(
      <div className="left">
      {this.props.approvedCategoryUser.map(category_user => {
        return <ApprovedCategoryUser key={category_user.id} category_user={category_user} />
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApprovedCategoryUserContainer));