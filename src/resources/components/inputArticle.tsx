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
        className="textarea"
        value={textInput}
        onChange={changeHandler}
        placeholder={placeholder}
      />
    </div>
  );
};

export default inputArticle;
