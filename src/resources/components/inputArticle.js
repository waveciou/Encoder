import React, { Component } from 'react';

class inputArticle extends Component {
  state = {
    value: ''
  };

  changeHandler = (e) => {
    this.props.updateTextInput(e.target.value);
  };

  render() {
    return (
      <div className="article">
        <label className="caption" htmlFor="input-area">Input :</label>
        <textarea id="input-area" className="textarea" value={ this.props.textInput } onChange={ this.changeHandler } />
      </div>
    );
  }
}

export default inputArticle;