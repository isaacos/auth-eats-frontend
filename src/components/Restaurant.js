import React, { Component } from 'react';
import { connect } from 'react-redux';

class Restaurant extends Component {

  render () {
    console.log(this.props.restaurant)
    return(

      <div>
        <img src={this.props.restaurant.image_url}/>
        <h3>{this.props.restaurant.name}</h3>
        <p>{this.props.restaurant.location}</p>
      </div>
    )

  }

}

export default Restaurant;
