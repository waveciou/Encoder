import React from 'react';

const inputArticle = ({
  textInput,
  placeholder,
  updateTextInput,
}: {
  textInput: string;
  placeholder: string;
  updateTextInput: (payload: string) => void;
}) => {
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const result: string = e.target.value.trim();
    updateTextInput(result);
  };

  return (
    <div className="tw-my-4 tw-text-white">
      <label className="tw-block tw-mb-3" htmlFor="input-area">
        Input :
      </label>
      <textarea
        id="input-area"
        className="tw-w-full tw-h-48 tw-py-2.5 tw-px-4 tw-block tw-overflow-x-hidden tw-overflow-y-auto tw-text-yellow tw-bg-black tw-break-words tw-tracking-wide tw-border tw-border-white tw-border-solid tw-rounded-md tw-resize-none"
        value={textInput}
        onChange={changeHandler}
        placeholder={placeholder}
      />
    </div>
  );
};

export default inputArticle;
