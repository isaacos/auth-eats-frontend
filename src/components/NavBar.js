import React, { Component } from 'react';
import { connect } from 'react-redux';

class NavBar extends Component {

  render () {
    return(
      <div>
      <input type="text" onChange={(event) => this.props.searchInput(event.target.value)}/>
      <input type="text"/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps =  {
  searchInput: (inputString) => ({type: 'SEARCHTYPECHANGE', inputString})

}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
