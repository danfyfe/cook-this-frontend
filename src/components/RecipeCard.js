import React, { Component } from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'

export default class RecipesCard extends Component {
  state = {
    isFavorite: false
  }

  render() {
    const {id, title, image, description, ready_in_time: cookTime} = this.props.recipe

    return (
      <Card
        id={id} style={{margin: "7px", textAlign: "center", border: "2px solid #870900", boxShadow: "none"}}
        onClick={this.props.handleClick}
      >
        <Card.Content>
          <h4>{title}</h4>
        </Card.Content>

        <Card.Content style={{}}>
          <img className="recipe-image"src={image} alt={title} height="100px" width="100px"/>
          <p>{cookTime ? cookTime : "Unknown Cook Time"}</p>
          <p>{description.slice(0, 100) + "..."}</p>
        </Card.Content>

        <Button
          onClick={this.props.handleFavBtnClick}
          attached="bottom"
          content={
            this.props.isFavorite ?
            <Icon name="heart" style={{color: "red"}} /> :
            <Icon name="heart outline" />
          }
          style={{display: "block", width: "auto", margin: "2px", boxShadow: "none"}}/>
      </Card>
    )
  }
}
