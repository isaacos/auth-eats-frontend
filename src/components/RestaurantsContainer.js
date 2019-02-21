import React, { Component } from 'react';
import { connect } from 'react-redux';
import Restaurant from './Restaurant'

class RestaurantsContainer extends Component {

  render () {
    console.log(this.props.restaurants)
    return(
      <div>
      {this.props.restaurants.slice(0, 8).map(restaurant =>
          <Restaurant key={restaurant.id} restaurant={restaurant} />)}

      </div>
    )
  }
}

const mapStateToProps = state => {

  return state
}

export default connect(mapStateToProps)(RestaurantsContainer);
