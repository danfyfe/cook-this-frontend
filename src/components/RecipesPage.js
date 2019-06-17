import React, { Component, Fragment } from 'react'
import { Form, Button, Card, Segment, Image, Grid } from 'semantic-ui-react'
import RecipeCard from './RecipeCard.js'
import RecipeCardBig from './RecipeCardBig.js'

export default class RecipesPage extends Component {
  state = {
    recipes: [],
    selectedRecipe: null, // RECIPE THAT IS SHOW BIG W/ DETAILS
    searchUrl: "",
    userData: {}
  }

  componentDidMount() {
    fetch("http://localhost:3000/recipes").then(r => r.json()).then(recipes => this.setState({recipes}))

    fetch("http://localhost:3000/profile", {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(r => r.json())
      .then(userData => {
        this.setState({userData})
        this.props.setUserDataOfApp(userData)
      })
  }

  createRecipe = () => {
    // SEND URL TO recipes#create
    this.setState({searchUrl: ""})
    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: this.state.searchUrl })
    })
      .then(r => r.json())
      .then(recipe => {
        this.setState({recipes: [...this.state.recipes, recipe]})
      })
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

  favRecipeIds = () => {
    if (this.state.userData.favorites) {
      return this.state.userData.favorites.map(fav => fav.recipe_id)
    } else {
      return []
    }
  }

  renderRecipeCards = () => {
    return this.state.recipes.map(recipe => {
      const isFavorite = () => {
        if (this.favRecipeIds().length > 0) {
          return this.favRecipeIds().includes(recipe.id)
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

    if (this.favRecipeIds().includes(recipeId)) {
      const userId = parseInt(this.state.userData.id, 10)

      fetch(`http://localhost:3000/favorites/${userId}/${recipeId}`, { method: "DELETE" })
        .then(r => {
            const favsCopy = this.state.userData.favorites.filter(fav => fav.recipe_id !== recipeId)

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
          user_id: this.state.userData.id,
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
              favorite
            ]}
          })
      )
    }
  }

  render() {
    console.log("RecipesPage state", this.state);
    if (!localStorage.token) {
      this.props.history.push("/")
    }



    return (

      <div style={{margin: "auto", width: "90%"}}>
        <Segment style={{}}>
          <Grid>
            <Grid.Column floated="left" width={1}>
              <Image alt="user" src={this.state.userData.image} style={{}}/>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <h3 style={{float: 'right', marginTop:'9px'}}>Welcome, {this.state.userData.username}!</h3>
            </Grid.Column>
          </Grid>
        </Segment>
        {
          this.state.selectedRecipe ? (
            <RecipeCardBig
              key={this.state.selectedRecipe}
              userData={this.state.userData}
              recipe={this.state.selectedRecipe}
              clearSelectedRecipe={this.clearSelectedRecipe} />
          ) : (
            <Fragment>

              <Card.Group itemsPerRow={4} style={{margin: "auto"}}>
                {this.renderRecipeCards()}
              </Card.Group>

              <br/>

              <Segment>
                <Form style={{padding: "10px", marginRight: "30px"}} onSubmit={this.createRecipe}>
                  Add New Recipe
                  <br/>
                  <Form.Field>
                    <label>Recipe</label>
                    <input
                      placeholder='Recipe URL'
                      value={this.state.searchUrl}
                      onChange={e => this.setState({searchUrl: e.target.value})}/>
                  </Form.Field>
                  <Button sytle={{margin: "10px"}} type='submit'>Submit</Button>
                </Form>
              </Segment>
            </Fragment>
          )
        }
      </div>
    )
  }
}
