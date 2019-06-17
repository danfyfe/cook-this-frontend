import React, { Component, } from 'react'
import { Button, Segment, Grid, Form, Divider } from 'semantic-ui-react'

export default class HomePage extends Component {
  state = {
    username: "",
    password: ""
  }

  componentDidMount() {
    if (localStorage.token) {
      this.props.history.push("/recipes")
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    }).then(r => r.json())
      .then(user => {
        localStorage.setItem("token", user.token)
        if (localStorage.token !== "undefined") {
          this.props.history.push("/")
        }
      })
  }

  render() {
    if (localStorage.token) {
      this.props.history.push("/recipes")
    }

    return (
      <Segment placeholder style={{margin: "100px 200px"}}>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column width={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username'
                name='username' onChange={this.handleChange} />
              <Form.Input icon='lock' iconPosition='left' label='Password' type='password'
                name='password' onChange={this.handleChange} />
              <Button content='Login' primary />
            </Form>
          </Grid.Column>


          <Grid.Column verticalAlign='middle' width={6}>
            <Button content='Sign up' icon='signup' size='big'
              onClick={() => this.props.history.push("/signup")}/>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
        {/* <div className="home">
          <div className="login-logout clearfix" style={{position: "relative"}}>
            <div style={{float: "left", margin: "0", position: "absolute", top: "50%", transform: "translateY(-50%)"}}>Hi welcome home. 🙃</div>
            {
              localStorage.token ? (
                <Button negative style={{float: "right"}} onClick={() => {delete localStorage.token; this.props.history.push("/")}}>Logout</Button>
              ) : (
                <Button positive style={{float: "right"}} onClick={() => this.props.history.push("/login")}>Login</Button>
              )
            }
          </div>
        </div> */}
      </Segment>
    )
  }
}
