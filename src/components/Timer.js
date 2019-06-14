import React from 'react'
import Countdown from 'react-countdown-now';
import '../App.css';
const TimeFormat = require('hh-mm-ss')

class Timer extends React.Component{
  state={
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMS: 0,
    timerDone: false
  }

  timeToMS=()=>{
    let hoursToSecs = parseInt(this.state.hours) * 3600;
    let minsToSecs = parseInt(this.state.minutes) * 60;
    let totalSecs = hoursToSecs + minsToSecs + parseInt(this.state.seconds)
    let totalMS = totalSecs * 1000
    return totalMS
  }


  setStuff = event =>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  setMS = (event)=>{
    event.preventDefault()
    this.setState({
      totalMS: this.timeToMS()
    })
  }

  resetTimer=()=>{
    this.setState({
      timerDone: false
    })
  }

  foodTimer = ()=>{
    this.setState({
      timerDone: true
    })
  }

  foodDone=()=>{
    return <h1 className="food-done">The Food Is Done, Probably!</h1>
  }

  render(){
    // console.log(this.state.timerDone)
    return(
      <div>
        <Countdown onComplete={this.foodTimer} date={Date.now()+ this.state.totalMS}>

        </Countdown>
        {this.state.timerDone ? this.foodDone() : null}
        <form>
          <input style={{width:"30px"}}type="text" name="hours" placeholder="hours" onChange={this.setStuff}/>
          <input style={{width:"30px"}}type="text" name="minutes" placeholder="mins"onChange={this.setStuff}/>
          <input style={{width:"30px"}}type="text" name="seconds" placeholder="secs"onChange={this.setStuff}/>
          <br/>
          <input type="submit" value="Start Timer"onClick={this.setMS}/>
          <button onClick={this.resetTimer}>Reset Timer</button>
        </form>
        </div>
    )
  }
}




export default Timer
