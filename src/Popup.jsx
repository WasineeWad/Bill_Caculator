import React, {Component} from 'react'
import './Popup.css'

class Popup extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCode: this.props.data
    }
  }
  setSelectedCode(codeObj){
      //console.log(this);
      let tempArr = this.state.selectedCode.slice();
      var selectedObj = document.getElementById(codeObj.value);
    //  var promotionCodeField = document.getElementById("txtProCode");
      var checked = selectedObj.checked;
      if(checked){
        //tempArr.push(codeObj);
        this.props.data.map((item) => {
          if(codeObj.id === item.id){
            item.selected = true;
          }
        })

      }
      else{
        // tempArr = tempArr.filter(function(obj){
        //     return obj !== codeObj;
        // });
        this.props.data.map((item) => {
          if(codeObj.id === item.id){
            item.selected = false;
          }
        })
      }
      this.setState({selectedCode: tempArr});
      //setTimeout(() => {console.log(this.state.selectedCode)}, 500);
  }

  submit(){
    this.props.callbackFromBill(this.state.selectedCode);
  }

  render() {
    return(
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-head">
            <div className="popup-title">Promotion Code</div>
            <a className="popup-close" onClick={() => this.props.closePopup()}><span className="glyphicon glyphicon-remove"></span></a>
          </div>
          <div className="popup-body">
            {
              this.props.data.map((item) => {
                return (
                  <div key={item.id}>
                    <input
                      type="checkbox"
                      value={item.value}
                      id={item.value}
                      onClick={() => this.setSelectedCode(item)}
                      checked={item.selected}
                    />
                    <span className="codeList">{item.label}</span>
                  </div>
                )
              })
            }
            <br/>
            <button className="btnSubmitAdd" onClick={() => this.submit()}>submit</button>
          </div>
        </div>
      </div>
    )

  }
}

export default Popup
