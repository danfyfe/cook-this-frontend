import React from 'react'
import { Card, Button } from 'semantic-ui-react'
const TimeFormat = require('hh-mm-ss')

export default class Timer extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      time: props.startTime,
      isTimerOn: true
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.countdown, 1000)
  }

  render() {
    return(
      <Card style={{minHeight: "150px"}}>
        {/* <Button size="mini" compact="true" style={{color: "red"}}>X</Button> */}

        <div style={{position: "relative", top: "40%", fontSize: "30px", transform: "translateY(-50%)"}}>
          {this.state.timerDone ? this.foodDone() : null}

          {TimeFormat.fromS(this.state.time, 'hh:mm:ss')}

          {
            this.state.isTimerOn ? (
              <Button negative onClick={this.turnTimerOnOff}>Stop Timer</Button>
            ) : (
              <Button positive onClick={this.turnTimerOnOff}>Start Timer</Button>
            )
          }
        </div>

      </Card>
    )
  }

  foodDone = () => {
    return <h1 className="food-done">The Food Is Done, Probably!</h1>
  }

  countdown = () => {
    if (this.state.time > 0) {
      this.setState({time: this.state.time - 1})
    } else {
      const audio = new Audio('./air-horn.mp3');
      audio.play();
    }
  }

  turnTimerOnOff = () => {
    if (this.state.isTimerOn) {
      clearInterval(this.interval)
    } else {
      this.interval = setInterval(this.countdown, 1000)
    }

    this.setState({isTimerOn: !this.state.isTimerOn})
  }
}
