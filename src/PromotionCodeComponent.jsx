import React, {Component} from 'react'
import './PromotionCodeComponent.css'

class PromotionCodeComponent extends Component {
  render(){
    return(
      <div>
        <label className="labelPromoCode"> Code </label>
        <input
            className="txtPromoCode"
            id="txtProCode"
            readOnly
          />
        <button
          className="btnAdd"
          onClick={this.props.toggleAdd()}
        ><span className="glyphicon glyphicon-plus-sign"></span>
        </button>
        <button
          className="btnEdit"
          onClick={this.props.toggleEdit()}
        ><span className="glyphicon glyphicon-edit"></span>
        </button>

      </div>

    )
  }
}

export default PromotionCodeComponent
