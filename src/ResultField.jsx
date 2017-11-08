import React, {Component} from 'react'
import './ResultField.css'

class ResultField extends Component {
  render(){
    return (
      <input className="inputResult" value={this.props.result} readOnly></input>
    )
  }
}

export default ResultField
