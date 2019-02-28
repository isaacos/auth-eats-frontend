import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button} from 'react-materialize'

class Category extends Component {

  state = {
    selectedCategory: null,
    selectedCategoryName: 'Click to choose the category you would like to add'
  }

  createCategoryUser = () =>{
    if(this.props.currentUser && this.state.selectedCategory){

      fetch('http://localhost:3000/api/v1/category_users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          category_id: this.state.selectedCategory.id,
          user_id: this.props.currentUser.id
        })
      })
      .then(r => r.json())
      .then(data => this.addCategoryToCurrentUser(data))
    }
  }

  addCategoryToCurrentUser = (newCategoryUser) => {
    //find category by newCategoryUser.category_id
    // add that category to categories list
    // add categories list to spread of current user
    // use the setCurrentUser from index
    let category = this.props.categories.find(category => category.id === newCategoryUser.category_id)
    let categories = [...this.props.currentUser.categories, category]
    let user = {...this.props.currentUser, categories: categories}
    this.props.setCurrentUser(user)
  }





  render(){
    console.log(this.props.currentUser)
    return (
      <div>
        <h1> CATEGORY!!!!!! </h1>


        <div className="categories-list" >
          {this.props.categories.map (category => <div><p id={category.id} onClick={() => this.setState({selectedCategory: category, selectedCategoryName: category.name})}>{category.name}</p></div>)}
        </div>
        <div>
        {this.state.selectedCategoryName}<br />
        <Button onClick={() => this.createCategoryUser()}> Add the category </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  setCurrentUser:  (user) => ({type: 'SETCURRENTUSER', user})
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
