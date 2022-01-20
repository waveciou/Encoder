import React from 'react';

const inputArticle = ({ textInput, placeholder, updateTextInput }) => {
  const changeHandler = (e) => {
    const result = e.target.value.trim();
    updateTextInput(result);
  };

  return (
    <div className="article">
      <label className="caption" htmlFor="input-area">Input :</label>
      <textarea
        id="input-area"
        className="textarea"
        value={ textInput }
        onChange={ changeHandler }
        placeholder={ placeholder }
      />
    </div>
  );
};

export default inputArticle;