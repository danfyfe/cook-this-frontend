import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import './App.css';

export default class App extends React.Component {
  state = {
    page: "index", // "index", "signup", "login"
    searchUrl: ""
  }

  createRecipe = () => {
    // SEND URL TO recipes#create
    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: this.state.searchUrl })
    })
      .then(r => r.json())
      .then(data => {
        debugger
      })
  }

  render() {
    if (this.state.page === "index") {
      // INDEX PAGE
      return (
        <div className="App">
          <Form onSubmit={this.createRecipe}>
            <Form.Field onChange={e => this.setState({searchUrl: e.target.value})}>
              <label>Recipe</label>
              <input placeholder='Recipe URL' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </div>
      )
    } else if (this.state.page === "login") {
      // LOGIN PAGE
    } else if (this.state.page === "signup") {
      // SIGNUP PAGE
    }
  }
}
