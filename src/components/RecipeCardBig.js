import React, { Component } from 'react'
import { Button, Card, Grid, List } from 'semantic-ui-react'
import Timer from './Timer.js'
import Note from './Note.js'
import Ingredient from './Ingredient.js'
import Step from './Step.js'

export default class RecipeCardBig extends Component {
  state = {
    timerVisible: false,
    notes: []
  }


  render() {
    console.log(this.state)
    const { title, image, description, prep_time: prepTime, cook_time: cookTime, ready_in_time: totalTime, ingredients, steps } = this.props.recipe

    return (
      <div>
        <Card style={{height: "100%", width: "100%", textAlign: "center"}}>
          <Grid>

            <Grid.Row style={{margin:"10px"}} centered>
              <h1>{title}</h1>
            </Grid.Row>


            <Grid.Row centered>
              <img className="recipe-image"alt ={title} src={image} height="250px" width="250px" />
            </Grid.Row>



            <Grid.Row centered>
              <Grid.Column width={3} style={{textAlign: "center"}}>{prepTime}</Grid.Column>
              <Grid.Column width={3} style={{textAlign: "center"}}>{cookTime}</Grid.Column>
              <Grid.Column width={3} style={{textAlign: "center"}}>{totalTime}</Grid.Column>
            </Grid.Row>

            <hr width="70%"/>

            <Grid.Row centered>
              {description}
            </Grid.Row>

            <Grid.Row centered>
              <Grid.Column width={4}>
                <ul>
                  {ingredients.map(ingr => <Ingredient ingredient={ingr}/>)}
                </ul>
              </Grid.Column>
              <Grid.Column width={8}>
              <List ordered>
                  {steps.map(step =>  <List.Item><Step step={step}/></List.Item>)}
              </List>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
              <div style={{margin: "0 auto", padding:"10px", border: "1px solid darkgrey", borderRadius:"10px"}}>
              {this.state.timerVisible ?  <Timer/>
               : null }
                <Button onClick={()=>{this.setState({timerVisible: !this.state.timerVisible})}}attached="bottom">Toggle Timer</Button>
              </div>
            </Grid.Row>
            
            <hr width="50%"/>

            <Grid.Row centered>
              <Grid.Column width={4}>
                <Note/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
              <Button positive
              style={{margin:"20px"}}
              >Add A Note</Button>
            </Grid.Row>

            <hr width="50%"/>

            <Grid.Row>
              <Grid.Column centered>
                <Button negative
                  style={{margin: "20px"}}
                  onClick={this.props.clearSelectedRecipe}
                >Back</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card>
        </div>
    )
  }
}
