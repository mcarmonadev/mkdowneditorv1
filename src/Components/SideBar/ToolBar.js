import React, { Component } from "react";
import PropTypes from "prop-types";
import * as API from '../../../shared/http';

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      isValidButtonAdd: true,
      clasesAddButton:  ["ToolBarButton","ToolBarButtonAdd"],
      filenameExists: false
    };
    this.handleFileNameChange   = this.handleFileNameChange.bind(this);
    this.handleAddClick         = this.handleAddClick.bind(this);
    this.handleSaveClick        = this.handleSaveClick.bind(this);
    this.handleDeleteClick      = this.handleDeleteClick.bind(this);
    this.createFile             = this.createFile.bind(this);
    this.postNewFile            = this.postNewFile.bind(this);
  }  
  handleFileNameChange(event) {
    this.setState({
      fileName: event.target.value
    });
  }
  handleAddClick(comment) {
    this.setState({isValidButtonAdd: true});
    var resVal = !(this.state.fileName==null || (this.state.fileName.trimLeft() ===""));
    if(resVal){resVal = this.validFileName(this.state.fileName);}
    var classesAddB = ["ToolBarButton","ToolBarButtonAdd"];
    if(!resVal){
      classesAddB.push('ToolBarButton_Invalid');
      alert('Not Valid Name');
    }     
    this.setState({isValidButtonAdd: resVal, clasesAddButton:classesAddB});
    if(!resVal){return;}
    this.createFile(this.state.fileName);
  }
  handleSaveClick() {
    this.props.onSaveFile();
  }
  handleDeleteClick() {
    this.props.onDeleteFile();    
  }
  createFile(fileName) {
      API.getFilesByName(fileName)
          .then(res => {
              return res.json().then(matchedFile => {
                  this.setState(() => ({
                      filenameExists:matchedFile.exists, isValidButtonAdd: !matchedFile.exists
                  }));
                  if(matchedFile.exists){
                    alert('Filename is busy by existing file');
                  }else{
                    this.postNewFile(fileName);
                  }
              });
          })
          .catch(err => {
              this.setState(() => ({ error: err }));
          });
  }
  postNewFile(nameNewFile){
    var newFile = {filename:nameNewFile,textContent:''};
      API.postNewFile(newFile)
          .then(res => {
              return res.json().then(createdFile => {                
                  console.log(createdFile);
                  this.props.onCcreateFile(nameNewFile, createdFile.id);
              });
          })
          .catch(err => {
              this.setState(() => ({ error: err }));
          });    
  }
  render() {    
    return (
      <div className="ToolBarContainer">              
        <div className="ToolBarButtons">
          <div onClick={this.handleAddClick}  className={this.state.clasesAddButton.join(' ')} >ADD NEW</div>
          <div onClick={this.handleDeleteClick} className="ToolBarButton ToolBarButtonDelete">DELETE</div>
          <div onClick={this.handleSaveClick} className="ToolBarButton ToolBarButtonSave">SAVE TEXT</div>
        </div>
            
        <div className="ToolBarText">
          <form onSubmit={this.handleSubmit} className="txtFileName">
            <input className="txtFileNameInput"
              value={this.state.fileName}
              onChange={this.handleFileNameChange}
              placeholder="Add a File"
              type="text"
            />
          </form>        
        </div>
      </div>
    );
  }
  
  validFileName(fname) {
    var rg1=/^[^\\/:\*\?"<>\|]+$/; 
    var rg2=/^\./; // cannot start with dot (.)
    var rg3=/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; 
    
    return rg1.test(fname)&&!rg2.test(fname)&&!rg3.test(fname);
  }
}

ToolBar.propTypes = {
  isValidButtonAdd: PropTypes.bool,
  fileName: PropTypes.string
  //post: isValidButtonAdd.object,
  //comments: PropTypes.arrayOf(PropTypes.object)
};

export default ToolBar;
