import React, { Component } from 'react'
import { Form, Button, Card } from 'semantic-ui-react'
import RecipeCard from './RecipeCard.js'

export default class RecipesPage extends Component {
  state = {
    recipes: [],
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

  renderRecipeCards = () => {
    return this.state.recipes.map(recipe => {
      return <RecipeCard recipe={recipe} />
    })
  }

  render() {
    console.log("RecipesPage state: ", this.state)

    return (
      <div style={{margin: "50px auto", width: "90%"}}>
        <Card.Group itemsPerRow={4} style={{margin: "auto"}}>
          {this.renderRecipeCards()}
        </Card.Group>

        <br/>

        <Form style={{width: "90%"}} onSubmit={this.createRecipe}>
          Add New Recipe
          <Form.Field onChange={e => this.setState({searchUrl: e.target.value})}>
            <label>Recipe</label>
            <input placeholder='Recipe URL' value={this.state.searchUrl}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}
