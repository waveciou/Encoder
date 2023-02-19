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
    <div className="flex">
      <div className="select-fieldset w-6/12 flex-1">
        <input
          type="radio"
          name="select-control"
          id="encode"
          value="true"
          onChange={changeHandler}
          checked={selected === true}
          className="w-0 h-0 p-0 m-0 absolute opacity-0 -z-1"
        />
        <label
          htmlFor="encode"
          title="Encode"
          className="p-2.5 flex items-center justify-center text-white cursor-pointer bg-green before-font-material before:content-['\e5ca'] before:mr-1 before:-ml-4 before:block before:text-mobile desktop:before:-ml-5 desktop:before:text-desktop"
        >
          Encode
        </label>
      </div>
      <div className="select-fieldset w-6/12 flex-1">
        <input
          type="radio"
          name="select-control"
          id="decode"
          value="false"
          onChange={changeHandler}
          checked={selected === false}
          className="w-0 h-0 p-0 m-0 absolute opacity-0 -z-1"
        />
        <label
          htmlFor="decode"
          title="Decode"
          className="p-2.5 flex items-center justify-center text-white cursor-pointer bg-blue before-font-material before:content-['\e5ca'] before:mr-1 before:-ml-4 before:block before:text-mobile desktop:before:-ml-5 desktop:before:text-desktop"
        >
          Decode
        </label>
      </div>
    </div>
  );
};

export default selecter;
