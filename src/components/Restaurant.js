import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';

class Restaurant extends Component {

  sluggifyCurrentRestaurant = (restaurant) => {
      return restaurant.name.toLowerCase().split(' ').join('-')
  }

  filterReviews = (trueOrFalse) => {
    return this.props.restaurant.reviews.filter(review => review.authentic === trueOrFalse)
  }

  averagesStarRating = (trueOrFalse) => {
    const filteredReview = this.filterReviews(trueOrFalse)
    if(filteredReview !== []){
      let ratingsArray = filteredReview.map(review => review.rating)
      return this.arrAvg(ratingsArray)
    }
  }

  arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

  render () {
    return(
      <div className="card-restaurant">
        <div className="inner-card-rest">
          <img className="contained-image" src={this.props.restaurant.image_url} alt=""/>
          <h3 className="h3-title" onClick={() => {
            this.props.setCurrentRestaurant(this.props.restaurant)
            this.props.history.push(`/restaurants/${this.props.restaurant.slug}`)
          }}>
            {this.props.restaurant.name}
          </h3>
          <p>{this.props.restaurant.location}</p>
          <div className="stars-categories">
          <ul>
            {this.props.restaurant.categories.map(category => <li key={category.id}>{category.name}</li>)}
          </ul>
          {this.averagesStarRating(false)?
              <div>
                <StarRatings
                  rating={this.averagesStarRating(false)}
                  starRatedColor="#df565a"
                  numberOfStars={5}
                  starDimension="3vmin"
                  name='rating'
                />  <br />
              </div>
            :
              <div>
                <StarRatings
                  rating={0}
                  starRatedColor="#df565a"
                  numberOfStars={1}
                  starDimension="3vmin"
                  name='rating'
                /> No Generic rating
                <StarRatings
                  rating={0}
                  starRatedColor="#df565a"
                  numberOfStars={1}
                  starDimension="3vmin"
                  name='rating'
                />
              </div>
            }
            {this.averagesStarRating(true)?
              <div>
                <StarRatings
                  rating={this.averagesStarRating(true)}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="3vmin"
                  name='rating'
                />  <br />
              </div>
            :
              <div>
                <StarRatings
                  rating={0}
                  starRatedColor="#df565a"
                  numberOfStars={1}
                  starDimension="3vmin"
                  name='rating'
                />
                No Authentic rating
                <StarRatings
                  rating={0}
                  starRatedColor="#df565a"
                  numberOfStars={1}
                  starDimension="3vmin"
                  name='rating'
                /></div>
              }
          </div>
        </div>
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
