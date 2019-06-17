import React, { Component, Fragment } from 'react'
import { Button, Card, Grid, List, Form } from 'semantic-ui-react'
import Timer from './Timer.js'
import Note from './Note.js'
import Ingredient from './Ingredient.js'
import Step from './Step.js'

export default class RecipeCardBig extends Component {
  state = {
    timerVisible: false,
    notes: [],
    addingNote: false,
    addNoteContent: "",
    editingNote: false,
    noteToEdit: {},
    editNoteContent: ""
  }

  componentDidMount(){
    const recipeId = parseInt(this.props.recipe.id)
    // console.log("Recipe", recipeId)
    // console.log("Props", this.props)
    // console.log("Fav",fav)
    // console.log("Favorites", this.props.userData.favorites)
    if (this.props.userData.favorites.includes(recipeId)) {
      fetch(`http://localhost:3000/notes/${recipeId}`)
      .then(resp=>resp.json())
      .then(notes=>{
        // console.log("Notes",notes)
        let favNotes = [...notes]

          this.setState({
            notes: favNotes
          })
        })
    }
  }

  handleAddNoteClick=()=>{
    const recipeId = parseInt(this.props.recipe.id)
    // const fav = this.props.userData.favorites.find((fav)=>{ return fav.recipe_id === recipeId})
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipe_id: recipeId,
        content: this.state.addNoteContent
      })
    })
    .then(resp=>resp.json()).then(note=>{
      // console.log("Added Note",note)
      this.setState({
        notes: [...this.state.notes,note],
        addingNote: !this.state.addingNote,
        addNoteContent: ""
      })
    })
  }

  cancelAdd = ()=>{
    this.setState({addingNote: !this.state.addingNote})
  }

  renderNotes=()=>{
  // console.log("renderNotes!")
    return this.state.notes.map(note=>{
      return <Note
      editingNote={this.state.editingNote}
      key={note.id}
      note={note}
      handleEditNote={this.handleEditNote}
      setEditingNote={this.setEditingNote} handleDeleteNote={this.handleDeleteNote} />
    })
  }


  setEditingNote=(note)=>{
    this.setState({
      editingNote: !this.state.editingNote,
      noteToEdit: note,
      editNoteContent: note.content
    })
  }
  cancelEdit=()=>{
    this.setState({editingNote: !this.state.editingNote})
  }


  renderEditForm=()=>{
    return <Form style={{ backgroundColor: "white", border: "2px solid #d2d2d2", borderRadius: "10px", padding: "10px", width:"50%", margin:"0 auto"}} onSubmit={this.handleEditNoteClick}>
        <Form.Field>
          <label>Edit Note:</label>
          <input placeholder={this.state.noteToEdit.content}
          value={this.state.editNoteContent}
          onChange={e=>this.setState({editNoteContent:e.target.value})}/>
        </Form.Field>
        <Button sytle={{margin: "10px"}}type='submit'>Submit</Button>
        <Button onClick={this.cancelEdit}sytle={{margin: "10px"}}>Cancel</Button>
      </Form>
  }

  handleEditNoteClick=()=>{
    let note = this.state.noteToEdit
    // console.log(this.state)
    // console.log("Note", note)
    fetch(`http://localhost:3000/notes/${note.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({
      id: note.id,
      content: this.state.editNoteContent
    })
  }).then(r=>r.json())
  .then(updatedNote=>{
    let newNotes = []

    this.state.notes.map(mapNote=>{
      return mapNote.id === updatedNote.id ? null : newNotes = [...newNotes, mapNote]
    })

    newNotes = [...newNotes, updatedNote]

    this.setState({
      notes: newNotes,
      editingNote: !this.state.editingNote
    })
  })
  }

  handleDeleteNote=(noteId)=>{
    fetch(`http://localhost:3000/notes/${noteId}`, {method:"DELETE"}).then(resp=>{
      let notesCopy = []
      // console.log(notesCopy)
      this.state.notes.map(note=>{
        return note.id === noteId ? null : notesCopy = [...notesCopy, note]
      })
      this.setState({
        notes: notesCopy
      })
    })
  }

  setAddingNote=()=>{
    this.setState({
      addingNote: !this.state.addingNote
    })
  }

  renderNoteForm=()=>{
    return <Form style={{ backgroundColor: "white", border: "2px solid #d2d2d2", borderRadius: "10px", padding: "10px", width:"50%", margin:"0 auto"}}onSubmit={this.handleAddNoteClick}>
        <Form.Field>
          <label>Add Note:</label>
          <input placeholder="...note content"
          value={this.state.addNoteContent}
          onChange={e=>this.setState({addNoteContent:e.target.value})}/>
        </Form.Field>
        <Button sytle={{margin: "10px"}}type='submit'>Submit</Button>
        <Button onClick={this.cancelAdd}sytle={{margin: "10px"}}>Cancel</Button>
      </Form>
  }



  render() {
    // console.log(this.state.editingNote)
    // console.log(this.props)
    // console.log("NoteFormContent", this.state.addNoteContent)

    const { id, title, image, description, prep_time: prepTime, cook_time: cookTime, ready_in_time: totalTime, ingredients, steps } = this.props.recipe

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
            {
              this.props.userData.favorites.includes(id)
              ?
              <Fragment>
                <Grid.Row centered>
                  <Grid.Column width={4}>
                    {this.renderNotes()}
                  </Grid.Column>
                </Grid.Row>

                {this.state.editingNote ?
                <Grid.Row centered>
                  <Grid.Column>
                  {this.renderEditForm()}
                  </Grid.Column>
                </Grid.Row> : null}

                {this.state.addingNote ?
                  <Grid.Row centered>
                  <Grid.Column>
                  {this.renderNoteForm()}
                  </Grid.Column>
                  </Grid.Row> : null
                }

                {this.state.addingNote ? null : <Grid.Row centered>
                  <Button positive
                  style={{margin:"20px"}}
                  onClick={this.setAddingNote}
                  >Add A Note</Button>
                </Grid.Row>}

                <hr width="50%"/>
              </Fragment>
              : null
            }
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
