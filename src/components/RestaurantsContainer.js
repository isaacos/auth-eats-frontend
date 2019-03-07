import React, { Component } from 'react';
import { connect } from 'react-redux';
import Restaurant from './Restaurant';
import { Button } from 'react-materialize';

class RestaurantsContainer extends Component {

  state = {
    sliceStart: 0,
    sliceEnd: 10
  }

  filteredCategory = () => {
    let filteredRestaurants = this.props.restaurants.filter(restaurant => {
      //creates array of categories filtered by category name
      //if no category name includes the searchTypeTerm it returns an empty array
      //uses the length of array r and if it is greater than 0 returns the restaurant
      //runs restaurant.name includes with the search term also
      let r = restaurant.categories.filter(category => category.name.toLowerCase().includes(this.props.searchTypeTerm.toLowerCase())).length
      return (restaurant.name.toLowerCase().includes(this.props.searchTypeTerm.toLowerCase()) || r > 0)
    })
    return filteredRestaurants
  }

  disableButton = (plusOrMinus) => {
    if(plusOrMinus === '+'){

      let newStart = this.state.sliceStart + 10
      let newEnd = this.state.sliceEnd + 10
      if(this.filteredCategory().slice(newStart, newEnd).length > 0){
        return <Button onClick={() => this.setState({sliceStart: this.state.sliceStart + 10, sliceEnd: this.state.sliceEnd + 10})}>Next 10</Button>
      }
    }
    if(plusOrMinus === '-' ){

      let newStart = this.state.sliceStart - 10
      let newEnd = this.state.sliceEnd - 10
      if(this.filteredCategory().slice(newStart, newEnd).length > 0){
        return  <Button className="previous-btn" onClick={() => this.setState({sliceStart: this.state.sliceStart - 10, sliceEnd: this.state.sliceEnd - 10})} >Previous 10</Button>
      }
    }
    return <div></div>
  }



  render () {
    console.log(this.disableButton('+'))
    return(
      <div className="restaurant-container">
      {this.filteredCategory().slice(this.state.sliceStart, this.state.sliceEnd).map(restaurant =>
          <Restaurant key={restaurant.slug} history={this.props.history} restaurant={restaurant} />)}
          {this.disableButton('-')}
          {this.disableButton('+')}
      </div>
    )
  }
}

const mapStateToProps = state => {

  return state
}


export default connect(mapStateToProps)(RestaurantsContainer);
