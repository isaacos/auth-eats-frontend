import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectedRestaurant extends Component {


  render () {
      console.log('hi')
    return(
      <div>


      </div>
    )
  }

}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
  return {}

}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedRestaurant);
