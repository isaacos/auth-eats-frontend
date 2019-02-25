import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review'

class ReviewContainer extends Component {

  state = {
    rating: null,
    body: '',
  }

  CopyCurrentRestuarantWithNewReview = (newReview) => {
    let reviews = [newReview, ...this.props.currentRestaurant.reviews]
    this.props.addReview({...this.props.currentRestaurant, reviews: reviews})
  }

  submitHandler = event => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        body: this.state.body,
        rating: this.state.rating,
        authentic: false,
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

      foundReview = this.props.currentRestaurant.reviews.find(review => review.user.id == this.props.currentUser.id )
    }

    return foundReview
  }

  // hideNewReviewInput = () => {
  //   if(this.state.review){
  //     return (
  //
  //     )
  //   }
  // }



  render () {
    return(
      <div>


        <form onSubmit={event => this.submitHandler(event)}>
        <input type="text" placeholder="what did you think?" onChange={event => this.setState({body: event.target.value})}/>
        <input type="number" placeholder="1 outa 5" onChange={event => this.setState({rating: event.target.value})}/>
        <input type="submit" placeholder="submit" />
        </form>


        {this.props.reviews.map(review => <Review key={review.id} review={review} />)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  addReview: (currentRestaurantWithReview) => ({type: 'ADDREVIEW', currentRestaurantWithReview}),
  setCurrentRestaurant: (inputRestaurant) => ({type: 'SETCURRENTRESTAURANT', inputRestaurant})
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContainer);
