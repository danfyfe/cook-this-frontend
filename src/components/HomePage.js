import React, { Component, } from 'react'
import { Button, Segment, Grid, Form, Divider } from 'semantic-ui-react'

export default class HomePage extends Component {
  componentDidMount() {
    console.log(this.props.location.pathname)

    if (localStorage.token) {
      this.props.history.push("/recipes")
    }
  }

  render() {
    // 🙃
    return (
      <Segment placeholder style={{margin: "50px"}}>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username' />
              <Form.Input icon='lock' iconPosition='left' label='Password' type='password' />

              <Button content='Login' primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button content='Sign up' icon='signup' size='big' />
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
