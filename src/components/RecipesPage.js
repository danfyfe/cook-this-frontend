import React, { Component, Fragment } from 'react'
import { Form, Button, Card } from 'semantic-ui-react'
import RecipeCard from './RecipeCard.js'
import RecipeCardBig from './RecipeCardBig.js'

export default class RecipesPage extends Component {
  state = {
    recipes: [],
    selectedRecipe: null, // RECIPE THAT IS SHOW BIG W/ DETAILS
    searchUrl: "",
    userData: {}
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

    fetch("http://localhost:3000/profile", {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(r => r.json())
      .then(userData => this.setState({userData}))
  }

  selectRecipe = e => {
    if (e.target.closest(".button")) {
      this.handleFavBtnClick(e)
    } else { // IGNORE CLICK ON BUTTON
      const recipeId = parseInt(e.currentTarget.id, 10)
      const selectedRecipe = this.state.recipes.find(recipe => recipe.id === recipeId)
      this.setState({selectedRecipe})
    }
  }

  clearSelectedRecipe = () => this.setState({selectedRecipe: null})

  renderRecipeCards = () => {
    // console.log("renderRecipeCards", this.state.userData.favorites)
    return this.state.recipes.map(recipe => {
      const isFavorite = () => {
        if (this.state.userData.favorites) {
          return this.state.userData.favorites.includes(recipe.id)
        } else {
          return false
        }
      }

      return (
        <RecipeCard
          isFavorite={isFavorite()}
          key={recipe.id}
          recipe={recipe}
          userData={this.state.userData}
          handleClick={this.selectRecipe}/>
      )
    })
  }

  handleFavBtnClick = e => {

    const recipeId = parseInt(e.target.closest(".card").id, 10)

    if (
      this.state.userData.favorites.includes(recipeId)
      )
   {
      const userId = parseInt(this.state.userData.user.id, 10)

      fetch(`http://localhost:3000/favorites/${userId}/${recipeId}`, { method: "DELETE" })
        .then(r => {
            const favsCopy = this.state.userData.favorites.filter(favRecipeId => favRecipeId !== recipeId)

            this.setState({userData: {
              ...this.state.userData,
              favorites: favsCopy
            }})
          }
        )
    } else {
      fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: this.state.userData.user.id,
          recipe_id: e.target.closest(".card").id
        })
      }).then(r => r.json())
        .then(favorite =>
          // console.log("Fav return",favorite)
          this.setState({
          userData: {
            ...this.state.userData,
            favorites: [
              ...this.state.userData.favorites,
              favorite.recipe_id]}
          })
      )
    }
  }

  render() {
    console.log("RecipesPage state: ", this.state)
    // console.log("UserImage", this.state.userData.user)

    return (

      <div style={{margin: "50px auto", width: "90%"}}>
        {
          this.state.selectedRecipe ? (
            <RecipeCardBig
              key ={this.state.selectedRecipe}
              userData={this.state.userData}
              recipe={this.state.selectedRecipe}
              clearSelectedRecipe={this.clearSelectedRecipe} />
          ) : (
            <Fragment>

              <Card.Group itemsPerRow={4} style={{margin: "auto"}}>
                {this.renderRecipeCards()}
              </Card.Group>

              <br/>

              <Form style={{ backgroundColor: "white", border: "2px solid #d2d2d2", borderRadius: "10px", padding: "10px"}} onSubmit={this.createRecipe}>
                Add New Recipe
                <br/>
                <Form.Field>
                  <label>Recipe</label>
                  <input
                    placeholder='Recipe URL'
                    value={this.state.searchUrl}
                    onChange={e => this.setState({searchUrl: e.target.value})}/>
                </Form.Field>
                <Button sytle={{margin: "10px"}}type='submit'>Submit</Button>
              </Form>
            </Fragment>
          )
        }
      </div>
    )
  }
}
