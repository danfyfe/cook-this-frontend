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
            <img className="logo" alt="chef hat" src="https://previews.dropbox.com/p/thumb/AAd_9EWPHSZsHFHZ7761DVtXEtIHfdKvng1oC0t3sOBW6V4YWhLmVXmoyoLSSjwRXmpj9PVpalP2MubH7x7saFLEDtQY1xLZKj1vrufU5RHNRQyDgS0MxpCvl-eFRK8x0CiHu9ptutIBZsTrYXQRtswCvLy2egVHK1JPEEJQklDibQ-a1P-J_Bh0SkRy3XAn2Htcyc9iUssQUomNVhQhAcwEYQF91zK_s0zz6hty-yJZII2F77NmfyoA6WuVJ6kMd3u7tiW8ml7WuB7q6w2zjPke3EDWKyoUdJmXoEAm_T4hn9iyEWQa5DkghEhNESLNJHMREpZc9Sm0XJekV4cuJj1Y/p.png?fv_content=true&size_mode=5"/>
            <div className="title">Cook This!</div>
          </Menu.Item>

          <Menu.Item position="right" style={{alignItems: "center"}}>
            {
              localStorage.token ?
              (
                <Button negative style={{float: "right"}} onClick={() => {delete localStorage.token; this.props.history.push("/")}}>Logout</Button>
              ) : (
                <Button positive style={{float: "right"}} onClick={() => this.props.history.push("/login")}>Login</Button>
              )
            }
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
