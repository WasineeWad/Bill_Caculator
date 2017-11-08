import React, {Component} from 'react'
import './Bill.css'
import ResultField from './ResultField'
import PromotionCodeComponent from './PromotionCodeComponent'
import AmountComponent from './AmountComponent'
import CalBtn from './CalBtn'
import Popup from './Popup'
import EditPopup from './EditPopup'

class Bill extends Component{
  constructor(props) {
    super(props);
    this.state = {
      amount : '',
      codeOption : [
        {'id' : 1, 'value': 'LUCKYONE', 'label': 'LUCKY ONE', 'discount': 15, 'action': 'show', 'selected': false},
        {'id' : 2, 'value': '4PAY3', 'label': '4PAY3', 'discount' : 25, 'action': 'show', 'selected': false},
        {'id' : 3, 'value': 'LUCKYTWO', 'label': 'LUCKY TWO', 'discount' : 20, 'action': 'show', 'selected': false}
      ],
      showAddPopup : false,
      showEditPopup : false,
      totalBill : 0
    }
  }
  callback = (dataFromChild) => {
      this.setState({codeOption: dataFromChild});
      var promotionCodeField = document.getElementById('txtProCode');
      promotionCodeField.value = '';
      dataFromChild.map((item) => {
        if(item.selected){
          promotionCodeField.value = promotionCodeField.value === '' ? item.value : promotionCodeField.value + ',' + item.value;
        }
      });
      //console.log(promotionCodeField);
      this.toggleAddPopup();
  }

  callbackEdit = (dataFromChild) => {
    this.setState({codeOption: dataFromChild});
  }

  calculate(){
    if(this.state.amount.trim().length === 0){
      alert('please input amount!');
      return;
    }
    var selectedCode = this.state.codeOption.filter((obj) => {
      return obj.selected === true
    })
    var valid = true;
    //if(selectedCode.length === 1){
      selectedCode.map((item) => {
        if(item.value === "4PAY3" && parseInt(this.state.amount.trim()) !== 4){
          valid = false;
          alert('Cannot use 4PAY3 promotion!');
        }
        if(item.value === "LUCKYTWO" && parseInt(this.state.amount.trim()) !== 2){
          valid = false;
          alert('Cannot use LUCKYTWO promotion!');
        }
      });

    if(!valid){
      return;
    }
    var hasPromotion = selectedCode.length !== 0;
    var noCalBill = parseInt(this.state.amount) * 459;
    var temp = 0;
    var discount = 0;
    if(hasPromotion){
      selectedCode.map((item) => {
        temp = noCalBill * (item.discount/100);
        discount = discount < temp ? temp : discount;
      });
    }
    if(noCalBill >= 1000){
      temp = noCalBill * 0.15;
      discount = discount < temp ? temp : discount;
      console.log('in no promotion and more than 1000 : ' + discount);
    }
    if(noCalBill >= 6000){
      temp = noCalBill * 0.25;
      discount = discount < temp ? temp : discount;
      console.log('in no promotion and more than 6000 : ' + discount);
    }
    //console.log(noCalBill - discount);
    this.setState({totalBill : noCalBill - discount})
  }

  toggleAddPopup(){
    this.setState({showAddPopup: !this.state.showAddPopup});
  }

  toggleEditPopup(){
    this.setState({showEditPopup: !this.state.showEditPopup});
  }

  onAmountChange(event) {
      this.setState({amount: event.target.value});
  }

  render(){
    return (

      <div className="container">
          <div className="cal-block">
            <div>
              <ResultField result={this.state.totalBill}></ResultField>
            </div>
            <div>
              <br/>
              <AmountComponent
                amount={this.state.amount}
                inputChange={(event) => this.onAmountChange.bind(this)}
              />
            </div>
            <div>
              <br/>
              <PromotionCodeComponent
                toggleAdd = {() => this.toggleAddPopup.bind(this)}
                toggleEdit = {() => this.toggleEditPopup.bind(this)}
              />
            </div>
            <div>
              <br />
              <br />
              <CalBtn
                calculate = {() => this.calculate.bind(this)}
              />
            </div>

            {this.state.showAddPopup ?
              <Popup
                data={this.state.codeOption}
                closePopup={this.toggleAddPopup.bind(this)}
                callbackFromBill={this.callback}
              />
              : null
            }

            {this.state.showEditPopup ?
              <EditPopup
                data={this.state.codeOption}
                closePopup={this.toggleEditPopup.bind(this)}
                callbackFromBill={this.callbackEdit}
              />
              : null
            }
          </div>
      </div>
    )
  }
}

export default Bill
