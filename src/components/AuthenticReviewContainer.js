import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthenticReview from './AuthenticReview'

class AuthenticReviewContainer extends Component {

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
          return review.user.id == this.props.currentUser.id
      })
    }

    if(foundReview === undefined){
      foundReview = null
    }
    return foundReview
  }




  render () {
    console.log(this.findUserReview())
    return(
      <div>
        <h2>Authentic Reviews</h2>
        {(this.props.currentUser && !this.findUserReview()) ?
          <form onSubmit={event => this.submitHandler(event)}>
          <input type="text" placeholder="what did you think?" onChange={event => this.setState({body: event.target.value})}/>
          <input type="number" placeholder="1 outa 5" onChange={event => this.setState({rating: event.target.value})}/>
          <input type="submit" placeholder="submit" />
          </form>
          :
          <div></div>
        }

        {this.props.reviews.map(review => {
          if(review.authentic === true){
              return <AuthenticReview key={review.id} review={review} />
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
  setCurrentRestaurant: (inputRestaurant) => ({type: 'SETCURRENTRESTAURANT', inputRestaurant})
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticReviewContainer);
