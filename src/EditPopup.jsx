import React, {Component} from 'react'
import './EditPopup.css'

class EditPopup extends Component {
  constructor(props){
    super(props);
    this.state = {
      promotionData: this.props.data
    }
  }
  submit() {
    console.log(this.state.promotionData);
    this.props.callbackFromBill(this.state.promotionData);
    this.props.closePopup();
  }
  delete(item) {
    let dataCopy = this.state.promotionData.slice();
    dataCopy = dataCopy.filter(function(objData){
      return objData.id !== item.id;
    });
    this.setState({promotionData: dataCopy});
  }

  edit(item) {
    item.action = 'edit';
    let dataCopy = this.state.promotionData.slice();
    dataCopy.forEach(function(data, index, array) {
      if(data.id === item.id){
        dataCopy[index] = item;
      }
    });

    this.setState({promotionData : dataCopy});
  }

  save(id) {
    var row = document.getElementById(id);
    var cell = row.getElementsByTagName('td');
    console.log(row);
    var newVal = {};
    var value = cell[0].getElementsByTagName('input')[0].value;
    var label = cell[1].getElementsByTagName('input')[0].value;
    var discount = parseInt(cell[2].getElementsByTagName('input')[0].value);
    newVal.id = id;
    newVal.value = value;
    newVal.label = label;
    newVal.discount = discount;
    newVal.action = 'show';

    let dataCopy = this.state.promotionData.slice();
    dataCopy.forEach(function(item, index, array) {
      if(item.id === newVal.id){
        dataCopy[index] = newVal;
      }
    });
    this.setState({promotionData : dataCopy});
  }

  getLastID() {
    var lastID = 0;
    this.state.promotionData.forEach(function(item, index, array) {
      if(lastID < item.id){
        lastID = item.id;
      }
    });
    return lastID;
  }

  add() {
    var lastID = this.getLastID();
    var addObj = {};
    addObj.id = lastID + 1;
    addObj.value = '';
    addObj.label = '';
    addObj.discount = '';
    addObj.action = 'edit';
    let dataCopy = this.state.promotionData.slice();
    dataCopy.push(addObj);
    this.setState({promotionData : dataCopy});
  }

  clearState() {
    let dataCopy = this.state.promotionData.slice();
    dataCopy.forEach(function(item, index, array) {
      if(item.value === '' && item.label === '' && item.discount === ''){
        dataCopy.splice(index, 1);
      }
    });
    this.setState({promotionData : dataCopy});
  }

  close() {
    this.clearState();
    this.props.closePopup();
  }

  render() {
    return(
      <div className="popup-edit-background">
        <div className="popup-edit-content">
          <div className="popup-edit-head">
            <div className="popup-edit-title">Promotion Code Management</div>
            <a className="popup-edit-close" onClick={() => this.close()}><span className="glyphicon glyphicon-remove"></span></a>
          </div>
          <table className="popup-edit-table">
            <thead>
              <tr>
                <th>Promotion code</th>
                <th>Code name</th>
                <th>Discount</th>
                <th><span className="glyphicon glyphicon-pencil"></span></th>
                <th><span className="glyphicon glyphicon-trash"></span></th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.promotionData.map((item) => {
                  var codeCellElement = item.action === 'edit' ? <input type="text" defaultValue={item.value} />
                                        : <span>{item.value}</span>;
                  var nameCellElement = item.action === 'edit' ? <input type="text" defaultValue={item.label}/>
                                        : <span>{item.label}</span>;
                  var discountCellElement = item.action === 'edit' ? <input type="text" defaultValue={item.discount} />
                                        : <span>{item.discount.toString() + "%"}</span>;
                  var editCellElement = item.action === 'edit'? <span className='glyphicon glyphicon-ok btnOk' onClick={() => this.save(item.id)}></span>
                                        : <span className="glyphicon glyphicon-pencil btnPencil" onClick={() => this.edit(item)}></span>;

                  return (
                    <tr id={item.id} key={item.id}>
                      <td>
                        {codeCellElement}
                      </td>
                      <td>
                        {nameCellElement}
                      </td>
                      <td>
                        {discountCellElement}
                      </td>
                      <td>
                        {editCellElement}
                      </td>
                      <td>
                        <span className="glyphicon glyphicon-trash btnTrash" onClick={() => this.delete(item)}></span>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
          <br/>
          <div className="divButton">
            <button className="btnAddPopup" onClick={() => this.add()}>+</button>
            <button className="btnSubmitPopup" onClick={() => this.submit()}>Submit</button>
          </div>

        </div>
      </div>
    )
  }
}

export default EditPopup
