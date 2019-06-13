import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import HomePage from './components/HomePage'
import RecipesPage from './components/RecipesPage'

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Menu>
          <Menu.Item header><img className="logo" alt="chef hat" src="/images/chef.png"/>
          <div className="title">Cook This!</div>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path="/" render={({ history }) => <HomePage history={history} /> } />
          <Route path="/login" render={({ history }) => <LoginPage history={history} />} />
          <Route path="/signup" render={({ history }) => <SignupPage history={history} />} />
          <Route path="/recipes" render={() => <RecipesPage />} />
        </Switch>
      </div>
    )
  }
}
