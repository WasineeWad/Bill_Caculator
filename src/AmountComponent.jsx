import React, {Component} from 'react'
import './AmountComponent.css'

class AmountComponent extends Component {
  render(){
    return(
      <div>
        <label className="labelAmount">
          Amount of people
        </label>
        <input
          className="txtAmount"
          defalutvalue = {this.props.amount}
          onChange = {this.props.inputChange()}
        />
      </div>

    )
  }
}

export default AmountComponent
