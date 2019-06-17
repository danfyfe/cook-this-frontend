import React from 'react'
import Countdown from 'react-countdown-now';
import { Button, Form } from 'semantic-ui-react'
import '../App.css';
// const TimeFormat = require('hh-mm-ss')

export default class Timer extends React.Component{
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMS: 0,
    timerDone: false
  }

  timeToMS = () => {
    let hoursToSecs = parseInt(this.state.hours) * 3600;
    let minsToSecs = parseInt(this.state.minutes) * 60;
    let totalSecs = hoursToSecs + minsToSecs + parseInt(this.state.seconds)
    let totalMS = totalSecs * 1000
    return totalMS
  }

  setTimes = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  setMS = event => {
    event.preventDefault()
    this.setState({
      totalMS: this.timeToMS()
    })
  }

  resetTimer = () => {
    this.setState({
      timerDone: false
    })
  }

  foodTimer = () => {
    this.setState({
      timerDone: true
    })
  }

  foodDone = () => {
    return <h1 className="food-done">The Food Is Done, Probably!</h1>
  }

  render() {
    console.log(this.state)
    return(
      <div>
        <Countdown onComplete={this.foodTimer} date={Date.now() + this.state.totalMS}>
        </Countdown>

        <hr width="75%"/>

        {this.state.timerDone ? this.foodDone() : null}

        <Form style={{marginRight: "30px"}}>
          <Form.Field>
            <input type="text" name="hours" placeholder="hours"
            onChange={this.setTimes}/>
          </Form.Field>

          <Form.Field>
            <input type="text" name="minutes" placeholder="mins"
            onChange={this.setTimes}/>
          </Form.Field>

          <Form.Field>
            <input type="text" name="seconds" placeholder="secs"onChange={this.setTimes}/>
          </Form.Field>
        </Form>

        <hr width="75%"/>

        <Button onClick={this.setMS}>Start Timer</Button>
        <Button onClick={this.resetTimer}>Reset Timer</Button>
        <hr width="75%"/>
      </div>
    )
  }
}
