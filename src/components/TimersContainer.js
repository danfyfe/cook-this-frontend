import React, { Component } from 'react'
import { Card, Segment, Form } from 'semantic-ui-react'
import Timer from './Timer.js'

export default class TimersContainer extends Component {
  state = {
    timers: [],
    name: "",
    hours: "",
    minutes: "",
    seconds: ""
  }

  renderTimers = () => this.state.timers.map(timer => {
    return (
      <Timer
        id={timer.id}
        key={timer.id}
        startTime={timer.startTime}
        name={timer.name} />
    )
  })

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleAddTimer = () => {
    this.setState({
      timers: [
        ...this.state.timers,
        {
          id: Date.now(),
          startTime: (
            (parseInt(this.state.hours) ? parseInt(this.state.hours) : 0) * 3600 +
            (parseInt(this.state.minutes) ? parseInt(this.state.minutes) : 0) * 60 +
            (parseInt(this.state.seconds) ? parseInt(this.state.seconds) : 0)
          ),
          name: this.state.name
        }
      ]
    },
    () => this.setState({hours: "", minutes: "", seconds: "", name: ""}))
  }

  render() {
    // console.log(this.state);
    return (
      <Segment style={{width: "90%", border: "none", boxShadow: "none"}}>
        <Card.Group centered itemsPerRow={4} style={{margin: "auto"}}>
          <Card style={{padding: "5px"}}>
            <Form onSubmit={this.handleAddTimer}>
              <Form.Field>
                <input
                  type="text"
                  name="name"
                  placeholder="timer name"
                  onChange={this.handleChange}
                  value={this.state.name} />
              </Form.Field>

              <Form.Field>
                <input
                  type="number"
                  name="hours"
                  placeholder="hours"
                  onChange={this.handleChange}
                  value={this.state.hours} />
              </Form.Field>

              <Form.Field>
                <input
                  type="number"
                  name="minutes"
                  placeholder="minutes"
                  onChange={this.handleChange}
                  value={this.state.minutes} />
              </Form.Field>

              <Form.Field>
                <input
                  type="number"
                  name="seconds"
                  placeholder="seconds"
                  onChange={this.handleChange}
                  value={this.state.seconds} />
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
