import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

export default class RecipesCard extends Component {
  render() {
    const {id, title, image, description, ready_in_time: cookTime} = this.props.recipe

    return (
      <Card
        id={id} style={{margin: "7px", textAlign: "center", border: "3px solid black"}}
        onClick={this.props.handleClick}
      >
        <div>
          <h4>{title}</h4>
          <img src={image} alt={title} height="100px" width="100px"/>
          <p>{cookTime ? cookTime : "Unknown Cook Time"}</p>
          <p>{description.slice(0, 100) + "..."}</p>
        </div>
      </Card>
    )
  }
}
