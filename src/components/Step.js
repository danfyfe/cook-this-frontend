import React, { Component } from 'react'

export default class Step extends Component {
  state = {
    checked: false
  }

  checkBox=()=>{
    this.setState({
      checked : !this.state.checked
    })
  }

  render(){
    const {content} = this.props.step
    return(
      <div>
        {this.state.checked ? <div onClick={this.checkBox} style={{textDecoration: "line-through", opacity: "0.3"}}>{content} </div> : <div onClick={this.checkBox} >{content}</div>}
      </div>
    )
  }



}