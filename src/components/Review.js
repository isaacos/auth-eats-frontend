import React, { Component } from 'react';
import { connect } from 'react-redux';


class Review extends Component {

  render() {
    console.log(this.props)
    return(
      <div>
        <div>
          {this.props.review.body}
        </div>
        <div>
          {this.props.review.rating}
        </div>
      </div>
    )
  }
}

export default Review;
