import React, { Component } from 'react'
import { Form, Button, Card } from 'semantic-ui-react'
import RecipeCard from './RecipeCard.js'
import RecipeCardBig from './RecipeCardBig.js'

export default class RecipesPage extends Component {
  state = {
    recipes: [],
    selectedRecipe: null, // RECIPE THAT IS SHOW BIG W/ DETAILS
    searchUrl: ""
  }

  createRecipe = () => {
    // SEND URL TO recipes#create
    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: this.state.searchUrl })
    })
      .then(r => r.json())
      .then(recipe => {
        this.setState({recipes: [...this.state.recipes, recipe], searchUrl: ""})
      })
  }

  componentDidMount() {
    fetch("http://localhost:3000/recipes").then(r => r.json()).then(recipes => this.setState({recipes}))
  }

  selectRecipe = e => {
    const recipeId = parseInt(e.currentTarget.id, 10)
    const selectedRecipe = this.state.recipes.find(recipe => recipe.id === recipeId)
    this.setState({selectedRecipe})
  }

  clearSelectedRecipe = () => this.setState({selectedRecipe: null})

  renderRecipeCards = () => {
    return this.state.recipes.map(recipe => {
      return <RecipeCard key={recipe.id} recipe={recipe} handleClick={this.selectRecipe}/>
    })
  }


  render() {
    console.log("RecipesPage state: ", this.state)


    return (
      <div style={{margin: "50px auto", width: "90%"}}>
        {
          this.state.selectedRecipe ? (
            <RecipeCardBig recipe={this.state.selectedRecipe} clearSelectedRecipe={this.clearSelectedRecipe} />
          ) : (
            <Card.Group itemsPerRow={4} style={{margin: "auto"}}>
              {this.renderRecipeCards()}
            </Card.Group>
          )
        }

        <br/>

        <Form style={{width: "90%"}} onSubmit={this.createRecipe}>
          Add New Recipe
          <Form.Field>
            <label>Recipe</label>
            <input
              placeholder='Recipe URL'
              value={this.state.searchUrl}
              onChange={e => this.setState({searchUrl: e.target.value})}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}
