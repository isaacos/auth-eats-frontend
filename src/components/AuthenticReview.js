import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Button } from 'react-materialize';
import { Form } from 'react-bootstrap';


class AuthenticReview extends Component {
  state = {
    body: this.props.review.body,
    rating: this.props.review.rating,
    edit: false
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
        authentic: true
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
    let updatedReviews = this.props.currentRestaurant.reviews.filter(review => review.id !== deletedReview.id)
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
                rating={this.state.rating}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="3vmin"
                name='rating'
              />  <br />
            </div>
            {this.props.currentUser && this.props.currentUser.id === this.props.review.user.id ?
              <div>
                <div className={this.state.edit ? 'non' : "hidden"}>
                    <form onSubmit={event => this.edit(event)}>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        className="textbox"
                        value={this.state.body}
                        onChange={(event) => this.setState({body: event.target.value})}
                      /><br />
                      <StarRatings
                        rating={this.state.rating}
                        starRatedColor="gold"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="3vmin"
                        name='rating'
                      />  <br />
                      <Button type="submit" value="Edit">Edit</Button>
                    </form>
                    <Button className="delete-button" onClick={() => this.delete()}> Delete</Button>
                </div>
                <Button onClick={() => this.setState({edit: !this.state.edit})}>{this.state.edit ? 'Close Form' : 'Make a change'}</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticReview);
