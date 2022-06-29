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
    <div className="tw-flex">
      <div className="select-fieldset tw-w-6/12 tw-flex-1">
        <input
          type="radio"
          name="select-control"
          id="encode"
          value="true"
          onChange={changeHandler}
          checked={selected === true}
          className="tw-w-0 tw-h-0 tw-p-0 tw-m-0 tw-absolute tw-opacity-0 -tw-z-1"
        />
        <label
          htmlFor="encode"
          title="Encode"
          className="tw-p-2.5 tw-flex tw-items-center tw-justify-center tw-text-white tw-cursor-pointer tw-bg-green before-font-material before:tw-content-['\e5ca'] before:tw-mr-1 before:-tw-ml-4 before:tw-block before:tw-text-mobile desktop:before:-tw-ml-5 desktop:before:tw-text-desktop"
        >
          Encode
        </label>
      </div>
      <div className="select-fieldset tw-w-6/12 tw-flex-1">
        <input
          type="radio"
          name="select-control"
          id="decode"
          value="false"
          onChange={changeHandler}
          checked={selected === false}
          className="tw-w-0 tw-h-0 tw-p-0 tw-m-0 tw-absolute tw-opacity-0 -tw-z-1"
        />
        <label
          htmlFor="decode"
          title="Decode"
          className="tw-p-2.5 tw-flex tw-items-center tw-justify-center tw-text-white tw-cursor-pointer tw-bg-blue before-font-material before:tw-content-['\e5ca'] before:tw-mr-1 before:-tw-ml-4 before:tw-block before:tw-text-mobile desktop:before:-tw-ml-5 desktop:before:tw-text-desktop"
        >
          Decode
        </label>
      </div>
    </div>
  );
};

export default selecter;
