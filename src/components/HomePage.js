import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class HomePage extends Component {
  render() {
    // 🙃
    return (
      <div className="home">
        <div className="login-logout clearfix" style={{position: "relative"}}>
          <div style={{float: "left", margin: "0", position: "absolute", top: "50%", transform: "translateY(-50%)"}}>Hi welcome home. </div>
          {
            localStorage.token ?
            (
              <Button negative style={{float: "right"}} onClick={() => {delete localStorage.token; this.props.history.push("/")}}>Logout</Button>
            ) : (
              <Button positive style={{float: "right"}} onClick={() => this.props.history.push("/login")}>Login</Button>
            )
          }
        </div>
      </div>
    )
  }
}
