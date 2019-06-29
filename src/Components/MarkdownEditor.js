import React, { Component } from "react";

import SideBar from './SideBar/SideBar.js';
import EditorPanel from './Editor/EditorPanel.js';
import MarkdownDisplay from './Markdown/MarkdownDisplay.js';

import * as API from '../../shared/http';

var instanciaMarkdownEditor = null;

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.handlerMainSaveFile = this.handlerMainSaveFile.bind(this); 
    this.handlerSelectedFile      = this.handlerSelectedFile.bind(this); 
    this.handlerDeleteFile      = this.handlerDeleteFile.bind(this); 

    this.refEditorPanel = null;
    this.setrefEditorPanel = element => {
      this.refEditorPanel = element;
    };

    this.refSideBar = null;
    this.setrefSideBar = element => {
      this.refSideBar = element;
    };

    this.refMarkdownDisplay = null;
    this.setrefMarkdownDisplay = element => {
      this.refMarkdownDisplay = element;
    };

    instanciaMarkdownEditor = this;
  }  
  handlerSelectedFile(fileId, content) {
    this.refEditorPanel.setTextContent(content); 
    this.refMarkdownDisplay.setMarkdownContent(content);
  }  
  handlerDeleteFile(fileId) {
      API.deleteile(fileId)
          .then(res => {
              return res.json().then(deletedFile => {    
                  alert('File Deleted')         
                  console.log(instanciaMarkdownEditor);
                  instanciaMarkdownEditor.refEditorPanel.setTextContent('');
    			  this.refMarkdownDisplay.setMarkdownContent('');
                  instanciaMarkdownEditor.refSideBar.refreshResetFiles();
              });
          })
          .catch(err => {
              this.setState(() => ({ error: err }));
          });      
  }    
  handlerMainSaveFile(fileId) {
    var textFileContent = this.refEditorPanel.getTextContent();

    if(textFileContent==null || (textFileContent.trimLeft() ==="")){
      textFileContent       = '';
    }
      var saveFile = {idFile:fileId,textContent:textFileContent};
      API.postSaveFile(saveFile)
          .then(res => {
              return res.json().then(savedFile => {                
                  console.log(savedFile);
                  alert('File Saved')         
                  console.log(instanciaMarkdownEditor);  
                  instanciaMarkdownEditor.refMarkdownDisplay.setMarkdownContent(textFileContent);
                  instanciaMarkdownEditor.refSideBar.refreshFiles();      
              });
          })
          .catch(err => {
              this.setState(() => ({ error: err }));
          });    

  }
  render() {
    return (
      <div className="MainContainer">      
        <SideBar onSaveFile={this.handlerMainSaveFile} 
        			onSelectedFile={this.handlerSelectedFile} 
        			onDeleteFile={this.handlerDeleteFile}         			
        			ref={this.setrefSideBar}/>
        <EditorPanel ref={this.setrefEditorPanel}/>
        <MarkdownDisplay ref={this.setrefMarkdownDisplay}/>        
      </div>
    );
  }
}

  
export default MarkdownEditor;