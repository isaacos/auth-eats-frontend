import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize'
import { Form } from 'react-bootstrap';
import Select from 'react-select';

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
    //for the redirect to show the user it logged
    this.props.setViewedUser(this.props.currentUser)
    this.props.history.push(`/users/${this.props.currentUser.id}`)
  }

  render(){
    const { selectedOption } = this.state;
    return (
      <div>
        <h1> CATEGORY!!!!!! </h1>
        <div>
          <div className="categories-list" >
            <h5> categories to choose from:</h5>
            <Select
              value={ selectedOption }
              options={this.props.categories.map(category => {return {value: category, label: category.name}})}
              onChange={val =>this.setState({selectedCategory: val.value, selectedCategoryName: val.value.name})}
            />
          </div>
        </div>
        <div>
          <div className="category-description">
            {this.state.selectedCategoryName}<br />
            <Form.Control
              as="textarea"
              rows="3"
              className="textbox"
              placeholder="Explain why you are qualified. Previous experience or a recipe post here!"
              onChange={(event) => this.setState({description: event.target.value})}
            />
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
  loadusers: (users) => ({type: 'LOADUSERS', users}),
  setViewedUser: (inputUser) => ({type: 'SETVIEWEDUSER', inputUser})
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
