import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

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
    fetch("http://localhost:3000/signup", {
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
    console.log("SignupPage State: ", this.state)

    return (
      <div className="signup">
        Hey you! Sign up!
        <Form onSubmit={this.handleSubmit}>
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
      </div>
    )
  }
}
