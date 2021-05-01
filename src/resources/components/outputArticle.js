import React from 'react';

const outputArticle = (props) => {
  const { textOutput } = props;

  return (
    <div className="article">
      <label className="caption" htmlFor="output-area">Output :</label>
      <div id="output-area" className="textarea">{ textOutput }</div>
    </div>
  );
};

export default outputArticle;