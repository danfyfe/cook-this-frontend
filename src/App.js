import React from 'react'
import { Menu, Button, Card } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import SignupPage from './components/SignupPage'
import HomePage from './components/HomePage'
import RecipesPage from './components/RecipesPage'

export default class App extends React.Component {
  state = {
    userData: null
  }

  setUserData = userData => this.setState({userData})

  render() {
    // console.log("App props", this.props)
    // console.log("App state", this.state)

    return (
      <div style={{marginBottom: "20px"}}className="App">
        <Menu style={{backgroundColor: "#B83329", borderRadius: "0px", borderBottom: "black solid"}}>
          <Menu.Item header className="top" style={{border: "none !important"}}>
            <img className="logo" alt="chef hat" src="https://i.imgur.com/FtclHY5.png"/>
            <div className="title">Cook This!</div>
          </Menu.Item>

          { 
            localStorage.token ? (
              <Menu.Item position="right" style={{alignItems: "center", marginLeft: "0px !important"}}>
                <Button negative onClick={() => {
                    delete localStorage.token
                    this.props.history.push("/")
                    this.setUserData(null)
                  }}
                >Logout</Button>
              </Menu.Item>
            ) : null
          }
        </Menu>
        <Switch>
          <Route exact path="/" render={({ history }) => <HomePage history={history} /> } />
          <Route path="/signup" render={({ history }) => <SignupPage history={history} />} />
          <Route path="/recipes" render={({ history }) => (
              <RecipesPage history={history} setUserDataOfApp={this.setUserData}/>
          )} />
        </Switch>
      </div>
    )
  }
}
