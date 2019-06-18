import React, { Component, Fragment } from 'react'
import { Button, Card, Grid, List, Form } from 'semantic-ui-react'
import TimersContainer from './TimersContainer.js'
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

  favRecipeIds = () => this.props.userData.favorites.map(fav => fav.recipe_id)

  componentDidMount() {
    const recipeId = parseInt(this.props.recipe.id)

    if (this.favRecipeIds().includes(recipeId)) {
      const favId = this.props.userData.favorites.find(fav => fav.recipe_id === this.props.recipe.id).id
      const notes = this.props.userData.notes.filter(note => note.favorite_id === favId)
      this.setState({notes})
    }
  }

  handleAddNoteClick = () => {
    const recipeId = parseInt(this.props.recipe.id)
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: recipeId,
        user_id: this.props.userData.id,
        content: this.state.addNoteContent
      })
    }).then(resp => resp.json())
      .then(note => {
        this.setState(
          {
            notes: [...this.state.notes, note],
            addingNote: !this.state.addingNote,
            addNoteContent: ""
          },
          () => this.props.updateUserDataNotes(this.state.notes)
        )
      })
  }

  cancelAdd = () => {
    this.setState({addingNote: !this.state.addingNote})
  }

  renderNotes= () => {
    return this.state.notes.map(note => {
      return <Note
        editingNote={this.state.editingNote}
        key={note.id}
        note={note}
        handleEditNote={this.handleEditNote}
        setEditingNote={this.setEditingNote} handleDeleteNote={this.handleDeleteNote} />
    })
  }

  setEditingNote = note => {
    this.setState({
      editingNote: !this.state.editingNote,
      noteToEdit: note,
      editNoteContent: note.content
    })
  }

  cancelEdit = () => {
    this.setState({editingNote: !this.state.editingNote})
  }


  renderEditForm = () => {
    return (
      <Form style={{ backgroundColor: "white", border: "2px solid #d2d2d2", borderRadius: "10px", padding: "10px", width:"50%", margin:"0 auto"}} onSubmit={this.handleEditNoteClick}>
        <Form.Field>
          <label>Edit Note:</label>
          <input placeholder={this.state.noteToEdit.content}
            value={this.state.editNoteContent}
            onChange={e=>this.setState({editNoteContent:e.target.value})}/>
        </Form.Field>

        <Button sytle={{margin: "10px"}}type='submit'>Submit</Button>

        <Button onClick={this.cancelEdit}sytle={{margin: "10px"}}>Cancel</Button>
      </Form>
    )
  }

  handleEditNoteClick = () => {
    let note = this.state.noteToEdit
    fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({
        id: note.id,
        content: this.state.editNoteContent
      })
    }).then(r => r.json())
      .then(updatedNote => {
        const newNotes = this.state.notes.map(note => {
          return note.id === updatedNote.id ? updatedNote : note
        })

        this.setState({
          notes: newNotes,
          editingNote: !this.state.editingNote
        })
      })
  }

  handleDeleteNote = noteId => {
    fetch(`http://localhost:3000/notes/${noteId}`, {method:"DELETE"}).then(resp=>{
      const notesCopy = this.state.notes.filter(note => note.id !== noteId)

      this.setState(
        {notes: notesCopy},
        ()=>this.props.updateUserDataNotes(this.state.notes)
      )
    })
  }

  setAddingNote = () => this.setState({addingNote: !this.state.addingNote})

  renderNoteForm = () => (
    <Form
      style={{
        backgroundColor: "white", border: "2px solid #d2d2d2",
        borderRadius: "10px", padding: "10px",
        width:"50%", margin:"0 auto"
      }}
      onSubmit={this.handleAddNoteClick}
    >
      <Form.Field>
        <label>Add Note:</label>
        <input placeholder="...note content"
          value={this.state.addNoteContent}
          onChange={e => this.setState({addNoteContent:e.target.value})}/>
      </Form.Field>

      <Button sytle={{margin: "10px"}}type='submit'>Submit</Button>

      <Button onClick={this.cancelAdd}sytle={{margin: "10px"}}>Cancel</Button>
    </Form>
  )



  render() {
    const { id, title, image, description, prep_time: prepTime, cook_time: cookTime, ready_in_time: totalTime, ingredients, steps } = this.props.recipe

    return (
      <Card style={{height: "100%", width: "100%", textAlign: "center"}}>
        <Grid>
          <Grid.Row style={{}} centered>
            <h1 style={{marginTop: "20px"}}>{title}</h1>
          </Grid.Row>

          <Grid.Row centered>
            <img className="recipe-image"alt ={title} src={image} height="250px" width="250px" />
          </Grid.Row>

          <Grid.Row centered>
            <Grid.Column width={3} style={{textAlign: "center"}}>{prepTime}</Grid.Column>
            <Grid.Column width={3} style={{textAlign: "center"}}>{cookTime}</Grid.Column>
            <Grid.Column width={3} style={{textAlign: "center"}}>{totalTime}</Grid.Column>
          </Grid.Row>

          <Grid.Row centered >
            <Grid.Column width={10}>
              <p style={{textAlign:"center"}}>{description}</p>
            </Grid.Column>

          </Grid.Row>

          <hr width="70%"/>

          <Grid.Row centered>
            <Grid.Column width={4}>
              <List>
                { ingredients.map((ingr, i) => <Ingredient key={i} ingredient={ingr}/>) }
              </List>
            </Grid.Column>

            <Grid.Column width={8}>
              <List ordered>
                { steps.map(step =>  <List.Item><Step step={step}/></List.Item>) }
              </List>
            </Grid.Column>
          </Grid.Row>

          <hr width="70%"/>

          <Grid.Row centered>
            <TimersContainer />
          </Grid.Row>

          <hr width="70%"/>

          {
            /* CAN ONLY ADD NOTES IF RECIPE IN FAVS */
            this.favRecipeIds().includes(id) ? (
              <Fragment>
                <Grid.Row centered>
                    {this.renderNotes()}
                </Grid.Row>

                {
                  this.state.editingNote ? (
                    <Grid.Row centered>
                      <Grid.Column>
                        {this.renderEditForm()}
                      </Grid.Column>
                    </Grid.Row>
                  ) : null
                }

                {
                  this.state.addingNote ? (
                    <Grid.Row centered>
                      <Grid.Column>
                        {this.renderNoteForm()}
                      </Grid.Column>
                    </Grid.Row>
                  ) : (
                    <Grid.Row centered>
                      <Button positive
                        style={{margin:"20px"}}
                        onClick={this.setAddingNote}
                      >Add A Note</Button>
                    </Grid.Row>
                  )
                }

              </Fragment>
            ) : (
              <Grid.Row centered>Favorite this recipe to add Notes</Grid.Row>
            )
          }

          <hr width="70%"/>

          <Grid.Row>
            <Grid.Column centered="true">
              <div centered style={{color: "red", fontSize: "16px"}}>
                Going back will delete all timers!
              </div>

              <Button negative
                style={{margin: "20px"}}
                onClick={this.props.clearSelectedRecipe}
              >Back</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card>
    )
  }
}
