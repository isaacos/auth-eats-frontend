import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewContainer from './ReviewContainer'
import AuthenticReviewContainer from './AuthenticReviewContainer'

class SelectedRestaurant extends Component {

getNonAuthenticReview = () => {
  const nonAuthenticReviews = this.props.currentRestaurant.reviews.filter(review => review.authentic === false)
  return nonAuthenticReviews

}

  render () {
    return(
      <div>
      {this.props.currentRestaurant
        ?
          <div>
          <div className="card-holder">
            <div className="card">
              <div className="card-image">
                <img src={this.props.currentRestaurant.image_url} />
                </div>
                <div className="card-info">
                <h3>
                  {this.props.currentRestaurant.name}
                  </h3>
                  <p>{this.props.currentRestaurant.location}</p>
                  <p>Phone: {this.props.currentRestaurant.phone}</p>
                  <ul>
                    {this.props.currentRestaurant.categories.map(category => <li>{category.name}</li>)}
                </ul>
                </div>
              </div>
              </div>
              <div className="categoryuser-container">
              <div className="reviewcontainer">
                <ReviewContainer reviews={this.props.currentRestaurant.reviews}/>
              </div>
              <div className="authreviewcontainer">
                <AuthenticReviewContainer reviews={this.props.currentRestaurant.reviews}/>
              </div>
              </div>
            </div>
        :
            <div>
              loading
            </div>
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
  setCurrentRestaurant: (inputRestaurant) => ({type: 'SETCURRENTRESTAURANT', inputRestaurant}),

}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedRestaurant);
