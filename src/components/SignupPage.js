import React, { Component } from 'react'
import { Form, Button, Segment } from 'semantic-ui-react'

export default class SignupPage extends Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    fetch("https://cookthis-api.herokuapp.com//signup", {
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
    return (
      <Segment centered style={{margin: "100px auto", width: "500px", border: "2px solid #870900", boxShadow: "none"}}>
        <h1 style={{textAlign: "cetner"}}>Hey you! Sign up!</h1>



        <Form onSubmit={this.handleSubmit} style={{margin: "0 30px 0 0"}}>
          <Form.Field>
            <label>Username</label>
            <input name="username" placeholder="Username" onChange={this.handleChange}/>
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
          </Form.Field>

          <Form.Field>
            <label>Confirm Password</label>
            <input name="passwordConfirm" type="password" placeholder="Confirm Password" onChange={this.handleChange}/>
          </Form.Field>

          <Button type="submit">Signup</Button>
        </Form>
      </Segment>
    )
  }
}
