import React, { Component } from 'react';
import { connect } from 'react-redux';
import Restaurant from './Restaurant'

class RestaurantsContainer extends Component {

filteredCategory = () => {
  let filteredRestaurants = this.props.restaurants.filter(restaurant =>
    restaurant.category.includes(this.props.searchTypeTerm.toLowerCase())
  )
  return filteredRestaurants
}

  render () {

    return(
      <div className="restaurant-container">
      {this.filteredCategory().slice(0, 8).map(restaurant =>
          <Restaurant key={restaurant.id} history={this.props.history} restaurant={restaurant} />)}

      </div>
    )
  }
}

const mapStateToProps = state => {

  return state
}

export default connect(mapStateToProps)(RestaurantsContainer);
