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
    <div className="article">
      <label className="caption" htmlFor="input-area">
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
