import React, { Component } from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'
import Timer from './Timer.js'
import Note from './Note.js'


export default class RecipeCardBig extends Component {
  render() {
    const { title, image, description, prep_time: prepTime, cook_time: cookTime, ready_in_time: totalTime, ingredients, steps } = this.props.recipe

    return (
      <div>
        <Card style={{height: "100%", width: "100%", textAlign: "center"}}>
          <Grid>

            <Grid.Row style={{margin:"10px"}} centered>
              <h1>{title}</h1>
            </Grid.Row>
            <div style={{margin: "0 auto", padding:"10px", border: "1px solid black"}}>
              <Timer/>
            </div>
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
              <Grid.Column width={12}>{description}</Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
              <Grid.Column width={4}>
                <ul>
                  {ingredients.map(ingr => <li>{ingr.content}</li>)}
                </ul>
              </Grid.Column>
              <Grid.Column width={8}>
                <ol>
                  {steps.map(step => <li>{step.content}</li>)}
                </ol>
              </Grid.Column>
            </Grid.Row>

            <hr width="50%"/>

            <Grid.Row centered>
              <Note/>
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
