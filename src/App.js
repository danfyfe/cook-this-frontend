import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'

export default class App extends React.Component {
  state = {
    page: "index", // "index", "signup", "login"
    searchUrl: ""
  }

  recipeForm = () => (
    <Form onSubmit={this.createRecipe}>
      <Form.Field onChange={e => this.setState({searchUrl: e.target.value})}>
        <label>Recipe</label>
        <input placeholder='Recipe URL' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  )

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
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <div>Hi welcome home. 🙃</div>}/>
          <Route path="/login" render={({ history }) => <LoginPage history={history} />}/>
          <Route path="/signup" render={({ history }) => <SignupPage history={history} />}/>
          <Route path="/recipes" render={this.recipeForm} />
        </Switch>
      </div>
    )
  }
}
