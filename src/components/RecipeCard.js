import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

export default class RecipesCard extends Component {
  render() {
    const {title, image, description, ready_in_time: cookTime} = this.props.recipe

    return (
      <Card style={{margin: "10px", "text-align": "center"}}>
        <div>
          <h4>{title}</h4>
          <img src={image} height="100px" width="100px"/>
          <p>{description.slice(0, 100) + "..."}</p>
        </div>
      </Card>
    )
  }
}
