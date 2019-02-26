import React, { Component } from 'react';
import { connect } from 'react-redux';
import Restaurant from './Restaurant'

class RestaurantsContainer extends Component {

  state = {
    sliceStart: 0,
    sliceEnd: 10
  }

filteredCategory = () => {
  let filteredRestaurants = this.props.restaurants.filter(restaurant =>
    restaurant.category.includes(this.props.searchTypeTerm.toLowerCase())
  )
  return filteredRestaurants
}

  render () {
    return(
      <div className="restaurant-container">
      {this.filteredCategory().slice(this.state.sliceStart, this.state.sliceEnd).map(restaurant =>
          <Restaurant key={restaurant.slug} history={this.props.history} restaurant={restaurant} />)}
          <button onClick={() => this.setState({sliceStart: this.state.sliceStart + 10, sliceEnd: this.state.sliceEnd + 10})}>Next 10</button>
      </div>
    )
  }
}

const mapStateToProps = state => {

  return state
}


export default connect(mapStateToProps)(RestaurantsContainer);
