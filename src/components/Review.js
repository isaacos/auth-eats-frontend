import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import StarRatings from 'react-star-ratings';


class Review extends Component {
  state = {
    body: this.props.review.body,
    rating: this.props.review.rating
  }

  changeRating = ( newRating, name ) => {
  this.setState({
    rating: newRating
  });
}

  delete = () => {
    fetch(`http://localhost:3000/api/v1/reviews/${this.props.review.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(data => this.removedReview(data))
  }

  edit = event => {

    event.preventDefault()
    fetch(`http://localhost:3000/api/v1/reviews/${this.props.review.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        body: this.state.body,
        rating: this.state.rating,
        restaurant_id: this.props.currentRestaurant.id,
        user_id: this.props.currentUser.id,
        authentic: false
      })
    })

    .then(r => r.json())
    .then(data => this.updateReview(data))

  }

  updateReview = editedReview => {
    let updatedReviews = this.props.currentRestaurant.reviews.map(review => {
      if(review.id === editedReview.id){
        return editedReview
      } else {
        return review
      }
    })
    this.updateOrDeleteReview(updatedReviews)
  }

  updateOrDeleteReview = (updatedReviews) => {

    let updatedRestaurant = {...this.props.currentRestaurant, reviews: updatedReviews}
    let updatedRestaurantList = this.props.restaurants.map(restaurant => {
      if(restaurant.id === updatedRestaurant.id){
        return updatedRestaurant
      } else {
        return restaurant
      }
    })
    this.props.loadrestaurant(updatedRestaurantList)
    this.props.setCurrentRestaurant(updatedRestaurant)
  }


  removedReview = (deletedReview) => {
    let updatedReviews = this.props.currentRestaurant.reviews.filter( review => review.id !== deletedReview.id)
    this.updateOrDeleteReview(updatedReviews)
  }

  render() {
    return(
      <div className="review-card">
        <div className="inner-card">
          <div>
            {this.props.review.body}
          </div>
          <div>
          <StarRatings
          rating={this.props.review.rating}
          starRatedColor="#df565a"
          numberOfStars={5}
          starDimension="3vmin"
          name='rating'
        />  <br />

          </div>
            {this.props.currentUser && this.props.currentUser.id === this.props.review.user.id ?
            <div>
              <div>
                <form onSubmit={event => this.edit(event)}>
                    <input type="text" value={this.state.body} onChange={(event) => this.setState({body: event.target.value})}/>
                    <StarRatings
                    rating={this.state.rating}
                    starRatedColor="#df565a"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    starDimension="3vmin"
                    name='rating'
                  />  <br />
                    <Button type="submit" value="Edit">Edit</Button>
                </form>
              </div>
              <Button waves='light' onClick={() => this.delete()}> Delete</Button>
            </div>
            :
            <div></div>
            }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  setCurrentRestaurant: (inputRestaurant) => ({type: 'SETCURRENTRESTAURANT', inputRestaurant}),
  loadrestaurant: (restaurants) => ({type: 'LOADRESTAURANTS', restaurants})

}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
