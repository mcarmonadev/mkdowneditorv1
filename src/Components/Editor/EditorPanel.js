import React, { Component } from "react";


class EditorPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textContent:''
    };
    this.handleFileNameChange   = this.handleFileNameChange.bind(this);   
    this.getTextContent  		= this.getTextContent.bind(this);   
  }

  handleFileNameChange(event) {
    this.setState({
      textContent: event.target.value
    });
  }
  getTextContent() {
  	return this.state.textContent;
  }
  setTextContent(valueText) {
    this.setState({
      textContent: valueText
    });
  }

  render() {
    return (
      <div className="EditorContainer">
        <textarea name="textarea" className="EditorTextInput" value={this.state.textContent}
              onChange={this.handleFileNameChange}></textarea>
      </div>
    );
  }
}

export default EditorPanel;
