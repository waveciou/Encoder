import React, { Component } from 'react';

class selectControl extends Component {

  // * 字串轉布林
  stringToBoolean = (value) => {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
    }
    return value;
  };

  changeHandler = (e) => {
    const selectValue = this.stringToBoolean(e.target.value);
    this.props.setEncodeSelected(selectValue);
  };

  render() {
    const { encode_selected } = this.props;

    return (
      <div className="select__control">
        <div className="select__fieldset">
          <input type="radio" name="select-control" id="encode" value="true" onChange={ this.changeHandler } checked={ encode_selected === true } />
          <label htmlFor="encode" title="Encode">Encode<span></span></label>
        </div>
        <div className="select__fieldset">
          <input type="radio" name="select-control" id="decode" value="false" onChange={ this.changeHandler } checked={ encode_selected === false } />
          <label htmlFor="decode" title="Decode">Decode<span></span></label>
        </div>
      </div>
    );
  }
}

export default selectControl;