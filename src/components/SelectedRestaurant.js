import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewContainer from './ReviewContainer'

class SelectedRestaurant extends Component {

displayCurrentRestaurant = () => {

}




  render () {
    return(
      <div>
      {this.props.currentRestaurant
        ?
          <div>
            <h1>
              {this.props.currentRestaurant.name}
              </h1>
              <div>
                {this.props.currentRestaurant.category}
              </div>
              <ReviewContainer reviews={this.props.currentRestaurant.reviews}/>
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
  setCurrentRestaurant: (inputRestaurant) => ({type: 'SETCURRENTRESTAURANT', inputRestaurant})

}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedRestaurant);
