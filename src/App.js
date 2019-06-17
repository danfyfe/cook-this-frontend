import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import HomePage from './components/HomePage'
import RecipesPage from './components/RecipesPage'

export default class App extends React.Component {
  render() {
    console.log("App props", this.props)

    return (
      <div className="App">
        <Menu style={{backgroundColor: "#B83329", borderRadius: "0px", borderBottom: "black solid"}}>
          <Menu.Item header className="top" style={{border: "none !important"}}>
            <img className="logo" alt="chef hat" src="https://lh3.googleusercontent.com/_xxg2D1xKu8oxw51HmKJCFj5YsGbY5xHgGzGFn1BtwEpq53GD3OoYqqnm0Fnq240FMevWtW3I5wup2BA2Z2aYjyaBlGKW_Z0f_Ei-ZHp4tt-RrkM8RW0nPdvg0IY5Ss_5v5YwEMgdCF8befaEAQx-2NoWmux14AbTyMtzPQsPQstbXA7Lw2RvycalDPgyX10RdLRWuUSKLrJ4IbVySlk_EHnXVLKRk93gzF5hRYFkN71pAnUsoS-n2CXrVD_tv10xPgP2g7kTPNNqYrnCVAjEW-1FMEi6IH9ip602uD5PF-eB0oAh2K-bY4XFhN6D9kGwKLyB-C723QctDJgdE-0I03WHQeRydAsbgnO9GoOxIunJXhi8ByqdBbG-9VkXbbZ3XxK6C5ug0iB5ZAtuo6mLXjVl63YBygAWkpaPhdVdVxmSACVC0giY_mvT8fu-dWktzx76USDBXc1_SJYhVnmgg9k62iy5H_jGxy1A2ANFaAaY_OjqR-iQUOtjl5HAHKGWpC5H2TsONpFuncohmyLb8E93U7Ccd_EEAE6TnkbXNMFyCZ7MlPwOnyxUUCxQbExwSuWVvQ7qWwma5WcbtJlfTF7rIBioNMU0rArHBvb1eosvWjK8yk_T-wCMJ5eZ8qJk8khnqXNsTuCRjZLfPQxf0x1h5tjHDo=s512-no"/>
            <div className="title">Cook This!</div>
          </Menu.Item>

          <Menu.Item position="right" style={{alignItems: "center"}}>
            {
              localStorage.token ? (
                <Button negative onClick={() => {delete localStorage.token; this.props.history.push("/")}}>Logout</Button>
              ) : (
                <Button positive onClick={() => this.props.history.push("/login")}>Login</Button>
              )
            }
          </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path="/" render={({ history }) => <HomePage history={history} /> } />
          {/* <Route path="/login" render={({ history }) => <LoginPage history={history} />} /> */}
          <Route path="/signup" render={({ history }) => <SignupPage history={history} />} />
          <Route path="/recipes" render={({ history }) => <RecipesPage history={history} />} />
        </Switch>
      </div>
    )
  }
}
