import React, { Component } from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'


export default class RecipeCardBig extends Component {
  render() {
    const { title, image, description, prep_time: prepTime, cook_time: cookTime, ready_in_time: totalTime, ingredients, steps } = this.props.recipe

    return (
        <Card style={{height: "100%", width: "100%", textAlign: "center"}}>
          <Grid>
            <Grid.Row centered>
              <h1><u>{title}</u></h1>
            </Grid.Row>

            <Grid.Row centered>
              <img src={image} height="250px" width="250px" />
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

            <Grid.Row>
              <Grid.Column centered>
                <Button negative
                  onClick={this.props.clearSelectedRecipe}
                >Back</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card>
    )
  }
}
