import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

export default class RecipesCard extends Component {
  render() {
    const {id, title, image, description, ready_in_time: cookTime} = this.props.recipe

    return (
      <Card
        id={id} style={{margin: "7px", textAlign: "center", border: "1px solid black thin"}}
        onClick={this.props.handleClick}
      >
        <div>
          <h4>{title}</h4>
          <img className="recipe-image"src={image} alt={title} height="100px" width="100px"/>
          <div>
            <Icon name = "heart outline"/>
          </div>
          <p>{cookTime ? cookTime : "Unknown Cook Time"}</p>
          <p>{description.slice(0, 100) + "..."}</p>
        </div>
      </Card>
    )
  }
}
