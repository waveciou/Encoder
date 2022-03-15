import React from 'react';

// * 字串轉布林
const stringToBoolean = (value) => {
  if (value && typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return value;
};

const selectControl = ({ encode_selected, setEncodeSelected }) => {
  const changeHandler = (e) => {
    const selectValue = stringToBoolean(e.target.value);
    setEncodeSelected(selectValue);
  };

  return (
    <div className="select__control">
      <div className="select__fieldset">
        <input
          type="radio"
          name="select-control"
          id="encode"
          value="true"
          onChange={ changeHandler }
          checked={ encode_selected === true }
        />
        <label htmlFor="encode" title="Encode">Encode<span></span></label>
      </div>
      <div className="select__fieldset">
        <input
          type="radio"
          name="select-control"
          id="decode"
          value="false"
          onChange={ changeHandler }
          checked={ encode_selected === false }
        />
        <label htmlFor="decode" title="Decode">Decode<span></span></label>
      </div>
    </div>
  );
};

export default selectControl;