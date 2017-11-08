import React,{Component} from 'react'
import './CalBtn.css'

class CalBtn extends Component {
  render(){
    return(
      <button className="btnCal" onClick={this.props.calculate()}>Calculate</button>
    )
  }
}

export default CalBtn
