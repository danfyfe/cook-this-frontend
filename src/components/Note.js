import React, { Component, Fragment } from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'


export default class Note extends Component {
  render(){
    return(
        <Card id={this.props.note.id} style={{margin:"20px"}}>
          <Card.Header>
            <h4 style={{padding:"10px"}}>Note: </h4>
          </Card.Header>

          <Card.Content style={{wordWrap: "break-word"}}>
            {this.props.note.content}
          </Card.Content>

          <Grid.Row style={{margin:"10px"}} centered>
            <Grid.Column width={2} style={{textAlign: "center"}}>
              {
                this.props.editingNote ? null :
                <Fragment>
                  <Button
                  onClick={()=>{this.props.setEditingNote(this.props.note)}}
                  >Edit
                  </Button>
                  <Button onClick={()=>{this.props.handleDeleteNote(this.props.note.id)}} negative >Delete</Button>
                </Fragment>
              }
            </Grid.Column>
          </Grid.Row>
        </Card>
    )
  }
}
