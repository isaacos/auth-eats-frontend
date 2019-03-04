import React, { Component } from 'react';
import { connect } from 'react-redux';


class ApprovedCategoryUser extends Component {

  getCategoryName = () => {
    const category = this.props.categories.find(category => category.id === this.props.category_user.category_id)
    return category.name
  }

  render(){
    return(
      <div >
      <h4> {this.getCategoryName()}</h4>
      {this.props.category_user.description}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedCategoryUser);
