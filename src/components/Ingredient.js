import React, { Component } from 'react'
import { Checkbox, List } from 'semantic-ui-react'

export default class Ingredient extends Component {
  state = {
    checked: false
  }

  checkBox = () => {
    this.setState({
      checked: !this.state.checked
    })
  }

  render(){
    const {content} = this.props.ingredient

    return(
      <List.Item className="check-box">
        {
          this.state.checked ? (
            <Checkbox
              onClick={this.checkBox}
              label= {content}
              style={{textDecoration: "line-through", opacity: "0.3"}}/>
          ) : (
            <Checkbox onClick={this.checkBox} label= {content} />
          )
        }
      </List.Item>
    )
  }
}
