import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize'

class Category extends Component {

  state = {
    selectedCategory: null,
    selectedCategoryName: 'Click to choose the category you would like to add',
    description: ''
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
          user_id: this.props.currentUser.id,
          description: this.state.description,
          permission: false
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

    let categoriesusers = [...this.props.currentUser.category_user, newCategoryUser]
    let newUser = {...this.props.currentUser, category_user: categoriesusers}
    let newUsersList = this.props.users.map(user => {
      if(user.id === newUser.id){
        return newUser
      } else {
        return user
      }
    })
    this.props.setCurrentUser(newUser)
    this.props.loadusers(newUsersList)
  }

  render(){
    console.log(this.props.currentUser)
    return (
      <div>
        <h1> CATEGORY!!!!!! </h1>


        <div className="categories-list" >
          {this.props.categories.map (category => <div key={category.name}><p id={category.id} onClick={() => this.setState({selectedCategory: category, selectedCategoryName: category.name})}>{category.name}</p></div>)}
        </div>
        <div>
        <div className="category-description">
        {this.state.selectedCategoryName}<br />
        <input type="text" onChange={(event) => this.setState({description: event.target.value})}/>
        <Button onClick={() => this.createCategoryUser()}> Add the category </Button>
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  setCurrentUser:  (user) => ({type: 'SETCURRENTUSER', user}),
  loadusers: (users) => ({type: 'LOADUSERS', users})
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
