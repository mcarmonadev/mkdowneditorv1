import React, { Component } from "react";
import { Markdown } from 'react-showdown';

//var markdownPrinted = '# Hello\n\nMore content...';
class MarkdownDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textContent:''
    };
    this.setMarkdownContent   = this.setMarkdownContent.bind(this);      
  }
  setMarkdownContent(content) {
     this.setState(() => ({textContent:content}));
     //markdownPrinted = content;
  }
  render() {
    return (
      <div className="MarkdownContainer">
	      <div id='MarkdownShower_Canvas' className="MarkdownShower">
	       <Markdown markup={ this.state.textContent } />
	      </div>
      </div>
    );
  }

}
  
export default MarkdownDisplay;