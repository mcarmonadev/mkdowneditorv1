import React, { Component } from "react";

import SideBarTitle   from './SideBarTitle.js';
import FilesBar       from './FilesBar.js';
import ToolBar        from './ToolBar.js';

var instanciaSideBar = this;

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idSelectedFile: -1,
      contentSelectedFile: ''
    };
    this.onCreatedFile = this.onCreatedFile.bind(this);    
    this.handlerSelectedFile  = this.handlerSelectedFile.bind(this);  
    this.handlerDeleteFile    = this.handlerDeleteFile.bind(this);  
    this.refreshFiles = this.refreshFiles.bind(this); 
    this.refreshResetFiles = this.refreshResetFiles.bind(this); 
    this.refBarFiles = null;
    this.setrefBarFilesRef = element => {
      this.refBarFiles = element;
    };
    instanciaSideBar = this;
  }

  onCreatedFile(fileName, fileId) {//Este es un post Create
     this.setState(() => ({idSelectedFile:fileId}));
     this.refBarFiles.getPosts();
  }
  handlerSaveFile() {//Este es el inicio de save
    var fileId = instanciaSideBar.state.idSelectedFile;
    if(fileId==-1){alert('No file selected');return;}
    instanciaSideBar.props.onSaveFile(fileId);
  }  
  handlerSelectedFile(idFile, content){
    this.setState(() => ({ idSelectedFile: idFile, contentSelectedFile:content}))
   //alert('handlerSelectedFile '+idFile+' - '+content)
    this.props.onSelectedFile(idFile, content);
  }
  handlerDeleteFile() {//Este es el inicio de save
    this.props.onDeleteFile(this.state.idSelectedFile);
  }  
  refreshFiles(){
     this.refBarFiles.getPosts();
  }
  refreshResetFiles(){
     this.refBarFiles.setIdFileSelected(-1);
     this.setState(() => ({idSelectedFile:-1}));     
     this.refBarFiles.getPosts(-1);
     // handlerSelectedFile
  }
  render() {
    return (
      <div className="SideContainer">
        <SideBarTitle/>
        <FilesBar ref={this.setrefBarFilesRef} idFileSelected={this.state.idSelectedFile} 
                  onSelectedFile_SideBar={this.handlerSelectedFile} />
        <ToolBar onCcreateFile={this.onCreatedFile} onSaveFile={this.handlerSaveFile} 
                  onDeleteFile={this.handlerDeleteFile} />
      </div>
    );
  }
}

export default SideBar;
