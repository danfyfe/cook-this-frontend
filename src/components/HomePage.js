import React, { Component, } from 'react'
import { Redirect } from 'react-router'
import { Button, Segment, Grid, Form, Divider, Message } from 'semantic-ui-react'

export default class HomePage extends Component {
  state = {
    username: "",
    password: ""
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    fetch("https://cookthis-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        'Access-Control-Allow-Origin': 'https://cookthis.herokuapp.com'
      },
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
    return ( localStorage.token && localStorage.token !== "undefined" ? (
      <Redirect to={"/recipes"} />
    ) : (
      <>
        <Segment placeholder style={{margin: "100px 200px", border: "2px solid #870900", boxShadow: "none"}}>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username'
                  name='username' onChange={this.handleChange} />
                <Form.Input icon='lock' iconPosition='left' label='Password' type='password'
                  name='password' onChange={this.handleChange} />
                <Button content='Login' primary />
              </Form>
            </Grid.Column>


            <Grid.Column verticalAlign='middle'>
              <Button content='Sign up' icon='signup' size='big'
                onClick={() => this.props.history.push("/signup")}/>
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      </>
      )
    )
  }
}
