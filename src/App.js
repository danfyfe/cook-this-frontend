import React from 'react'
import { Button, Form, Menu } from 'semantic-ui-react'
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
        <Menu>
          <Menu.Item header><img className="logo" alt="chef hat" src="/images/chef.png"/>
          <div className="title">Cook This!</div>
          </Menu.Item>
        </Menu>
          <Switch>
            <Route exact path="/" render={() => <div className="welcome-div">Hi welcome home. 🙃</div>}/>
            <Route path="/login" render={({ history }) => <LoginPage history={history} />}/>
            <Route path="/signup" render={({ history }) => <SignupPage history={history} />}/>
            <Route path="/recipes" render={this.recipeForm} />
          </Switch>
        <Menu style={{bottom: 0}}>
          <Menu.Item footer> <div className="footer-text">Cook This!</div>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
