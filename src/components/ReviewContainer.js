import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review'

class ReviewContainer extends Component {

  state = {
    rating: null,
    body: ''
  }

  submitHandler = event => {
    event.preventDefault()
    console.log(this)

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
    .then(data => console.log(data))

  }

  render () {
    console.log(this.props)
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

export default connect(mapStateToProps)(ReviewContainer);
