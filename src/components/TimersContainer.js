import React, { Component } from 'react'
import { Button, Card, Segment, Form } from 'semantic-ui-react'
import Timer from './Timer.js'

export default class TimersContainer extends Component {
  state = {
    timerVisible: false,
    timers: [],
    hours: 0,
    mins: 0,
    secs: 0
  }

  renderTimers = () => this.state.timers.map(timer => <Timer />)

  render() {
    return (
      <Segment style={{width: "90%", border: "none", boxShadow: "none"}}>
        <Card.Group centered itemsPerRow={4} style={{margin: "auto"}}>
          <Card style={{padding: "5px"}}>
            <Form>
              <Form.Field>
                <input type="text" name="hours" placeholder="hours" onChange={this.setTimes}/>
              </Form.Field>

              <Form.Field>
                <input type="text" name="minutes" placeholder="mins" onChange={this.setTimes}/>
              </Form.Field>

              <Form.Field>
                <input type="text" name="seconds" placeholder="secs"onChange={this.setTimes}/>
              </Form.Field>

              <Form.Button>Add Timer</Form.Button>
            </Form>
          </Card>

          { this.renderTimers() }
        </Card.Group>
      </Segment>
    )
  }
}
