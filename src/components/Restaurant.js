import React, { Component } from 'react';
import { connect } from 'react-redux';

class Restaurant extends Component {

  sluggifyCurrentRestaurant = (restaurant) => {
      return restaurant.name.toLowerCase().split(' ').join('-')
  }

  render () {
    return(
      <div>
        <img className="contained-image" src={this.props.restaurant.image_url}/>
        <h3 onClick={() => {
          this.props.setCurrentRestaurant(this.props.restaurant)
          this.props.history.push(`/restaurants/${this.props.restaurant.slug}`)
        }}>{this.props.restaurant.name}</h3>
        <p>{this.props.restaurant.location}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps =  {
  setCurrentRestaurant: (inputRestaurant) => ({type: 'SETCURRENTRESTAURANT', inputRestaurant})
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
