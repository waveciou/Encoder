import React, { Component } from 'react';

class inputArticle extends Component {
  state = {
    value: ''
  };

  changeHandler = (e) => {
    const result = e.target.value.trim();
    this.props.updateTextInput(result);
  };

  render() {
    return (
      <div className="article">
        <label className="caption" htmlFor="input-area">Input :</label>
        <textarea
          id="input-area"
          className="textarea"
          value={ this.props.textInput }
          onChange={ this.changeHandler }
          placeholder={ this.props.placeholder }
        />
      </div>
    );
  }
}

export default inputArticle;