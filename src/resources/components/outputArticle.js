import React, { Component } from 'react';

class outputArticle extends Component {
  render() {
    const { textOutput } = this.props;
    return (
      <div className="article">
        <label className="caption" htmlFor="output-area">Output :</label>
        <div id="output-area" className="textarea">{ textOutput }</div>
      </div>
    );
  }
}

export default outputArticle;