import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review';
import { Button } from 'react-materialize';
import { Form } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class ReviewContainer extends Component {

  state = {
    rating: 2,
    body: '',
  }

  CopyCurrentRestuarantWithNewReview = (newReview) => {
    let reviews = [newReview, ...this.props.currentRestaurant.reviews]
    this.props.addReview({...this.props.currentRestaurant, reviews: reviews})
    let newRestaurants = this.props.restaurants.map(restaurant => {
      if(restaurant.id === this.props.currentRestaurant.id){
        return this.props.currentRestaurant
      } else {
        return restaurant
      }
    })
    this.props.loadrestaurant(newRestaurants)
  }

  submitHandler = event => {
    event.preventDefault()
    let authentic = false
    if(this.props.currentUser.nationality === this.props.currentRestaurant.category){
      authentic = true
    }
    fetch('http://localhost:3000/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        body: this.state.body,
        rating: this.state.rating,
        authentic: authentic,
        restaurant_id: this.props.currentRestaurant.id,
        user_id: this.props.currentUser.id
      })
    })
    .then(r => r.json())
    .then(data => this.CopyCurrentRestuarantWithNewReview(data))
  }

  findUserReview = () => {
    let foundReview = null
    if(this.props.currentUser){
      foundReview = this.props.currentRestaurant.reviews.find(review => {
          return review.user.id === this.props.currentUser.id
      })
    }
    if(foundReview === undefined){
      foundReview = null
    }
    return foundReview
  }

  currentUserSharedCategory = () => {
    return this.props.currentUser.category_user.find( cu => {
      return this.props.currentRestaurant.categories.find( c => {
        return (cu.category_id === c.id && cu.permission === true)
      })
    })
  }

  canDisplayReviewForm = () => {
    if(this.props.currentUser && !this.findUserReview()){
      if(this.currentUserSharedCategory() === undefined){
        return true
      }
    }
  }

  changeRating = ( newRating, name ) => {
    this.setState({
      rating: newRating
    })
  }

  render () {
    return(
      <div>
        <h4>Generic Reviews</h4>
          {(this.canDisplayReviewForm()) ?
            <form onSubmit={event => this.submitHandler(event)}>
              <Form.Control as="textarea" rows="3" className="textbox" placeholder="what did you think?" onChange={event => this.setState({body: event.target.value})}/> <br />
              <StarRatings
              rating={this.state.rating}
              starRatedColor="#df565a"
              changeRating={this.changeRating}
              numberOfStars={5}
              starDimension="3vmin"
              name='rating'
              />  <br />
              <Button type="submit" placeholder="submit"> Post the Review </Button>
            </form>
          :
          <div></div>
        }
        {this.props.reviews.map(review => {
          if(review.authentic === false){
              return <Review key={review.id} review={review} />
          }
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  addReview: (currentRestaurantWithReview) => ({type: 'ADDREVIEW', currentRestaurantWithReview}),
  setCurrentRestaurant: (inputRestaurant) => ({type: 'SETCURRENTRESTAURANT', inputRestaurant}),
  loadrestaurant: (restaurants) => ({type: 'LOADRESTAURANTS', restaurants})
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContainer);
