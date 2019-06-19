import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'
const TimeFormat = require('hh-mm-ss')

export default class Timer extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      time: props.startTime,
      isTimerOn: true,
      color: "",
      className: ""
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.countdown, 1000)
  }

  render() {
    return(
      <Card style={{minHeight: "150px", backgroundColor: this.state.color}} className={this.state.className}>
        {/* <Button size="mini" compact="true" style={{color: "red"}}>X</Button> */}

        <div style={{position: "relative", top: "50%", fontSize: "30px", transform: "translateY(-50%)"}}>
          {this.state.timerDone ? this.foodDone() : null}


            {this.props.name}

          <br/>

          <hr width={"80%"}/>

          {TimeFormat.fromS(this.state.time, 'hh:mm:ss')}

          <br/>
          <br/>

          {
            this.state.isTimerOn ? (
              <React.Fragment >
                <Button negative onClick={this.turnTimerOnOff}>Stop Timer</Button>
                <Image centered className="fork-and-knife" style={{marginTop: "20px",width: "50px", height:"50px"}} src="https://i.imgur.com/B3Vr3J4.png"/>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button positive onClick={this.turnTimerOnOff}>Start Timer</Button>
                <Image centered style={{marginTop: "20px",width: "50px", height:"50px"}} src="https://i.imgur.com/4CHZNhc.png"/>
              </React.Fragment>
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
      this.setState({color: "#" + Math.floor(Math.random() * 16777215).toString(16)})
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
