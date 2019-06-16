import React, { Component, Fragment } from 'react'
import { Button, Card, Grid, Form } from 'semantic-ui-react'


export default class Note extends Component {
  // state = {
  //   editingNote: false
  // }
  //
  // setEditing=()=>{
  //     this.setState({
  //       editingNote: !this.state.editingNote
  //     })
  // }
  //
  //
  // renderEditForm=()=>{
  //   return <Form style={{ backgroundColor: "white", border: "2px solid #d2d2d2", borderRadius: "10px", padding: "10px", width:"100%", margin:"0 auto"}}>
  //
  //   </Form>
  // }


  render(){
    // console.log(this.state.editingNote)

    return(
      <div>
        <Card id={this.props.note.id} style={{margin:"20px"}}>
          <Card.Header>
            <h4 style={{padding:"10px"}}>Note: </h4>
          </Card.Header>

          <Card.Content>
            {this.props.note.content}
          </Card.Content>


          <Grid.Row style={{margin:"10px"}} centered>
            <Grid.Column width={2} style={{textAlign: "center"}}>
            {this.props.editingNote ? null :
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
      </div>
    )
  }
}
