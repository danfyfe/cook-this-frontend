// import React, {Component, Fragment} from 'react'
// import Note from './Note.js'
//
//
// export default class NotesContainer extends Component {
//   state = {
//     notes: []
//   }
//
//   componentDidMount(){
//     const recipeId = parseInt(this.props.recipe.id)
//     // console.log("Recipe", recipeId)
//     // console.log("Props", this.props)
//     // console.log("Fav",fav)
//     // console.log("Favorites", this.props.userData.favorites)
//     if (this.props.userData.favorites.includes(recipeId)) {
//       fetch(`http://localhost:3000/notes/${recipeId}`)
//       .then(resp=>resp.json())
//       .then(notes=>{
//         // console.log("Notes",notes)
//         let favNotes = [...notes]
//
//           this.setState({
//             notes: favNotes
//           })
//         })
//     }
//   }
//
//   renderNotes=()=>{
//   // console.log("renderNotes!")
//     return this.state.notes.map(note=>{
//       return <Note
//       editingNote={this.state.editingNote}
//       key={note.id}
//       note={note}
//       handleEditNote={this.handleEditNote}
//       setEditingNote={this.setEditingNote} handleDeleteNote={this.handleDeleteNote} />
//     })
//   }
//
//
//
//   render(){
//     console.log(this.props)
//     return(
//       <Fragment>
//         {}
//       </Fragment>
//
//     )
//
//   }
//
//
//
//
// }
//
//
// // <Fragment>
// //   <Grid.Row centered>
// //     <Grid.Column width={4}>
// //       {this.renderNotes()}
// //     </Grid.Column>
// //   </Grid.Row>
// //
// //   {this.state.editingNote ?
// //   <Grid.Row centered>
// //     <Grid.Column>
// //     {this.renderEditForm()}
// //     </Grid.Column>
// //   </Grid.Row> : null}
// //
// //   {this.state.addingNote ?
// //     <Grid.Row centered>
// //     <Grid.Column>
// //     {this.renderNoteForm()}
// //     </Grid.Column>
// //     </Grid.Row> : null
// //   }
// //
// //   {this.state.addingNote ? null : <Grid.Row centered>
// //     <Button positive
// //     style={{margin:"20px"}}
// //     onClick={this.setAddingNote}
// //     >Add A Note</Button>
// //   </Grid.Row>}
// //
// //   <hr width="50%"/>
// // </Fragment>