import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'


export default class Note extends Component {
  render(){
    return(
      <div>
        <Card>
          <Card.Header>
            <h4 style={{padding:"10px"}}>Note: </h4>
          </Card.Header>

          <Card.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Card.Content>

          <Button negative attached="bottom">Delete Note</Button>
        </Card>
      </div>
    )
  }
}
