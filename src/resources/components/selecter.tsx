import React from 'react';

// * 字串轉布林
const stringToBoolean = (value: string): boolean => {
  if (value && typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return true;
};

const selecter = ({
  selected,
  setSelected,
}: {
  selected: boolean;
  setSelected: (payload: boolean) => void;
}) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectValue: boolean = stringToBoolean(e.target.value);
    setSelected(selectValue);
  };

  return (
    <div className="select__control">
      <div className="select__fieldset">
        <input
          type="radio"
          name="select-control"
          id="encode"
          value="true"
          onChange={changeHandler}
          checked={selected === true}
        />
        <label htmlFor="encode" title="Encode">
          Encode<span></span>
        </label>
      </div>
      <div className="select__fieldset">
        <input
          type="radio"
          name="select-control"
          id="decode"
          value="false"
          onChange={changeHandler}
          checked={selected === false}
        />
        <label htmlFor="decode" title="Decode">
          Decode<span></span>
        </label>
      </div>
    </div>
  );
};

export default selecter;
