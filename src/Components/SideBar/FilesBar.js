import React, { Component } from "react";
import File       from './File.js';

import * as API from '../../../shared/http';

class FilesBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        loading: false,
        files: [],
        idSelectedFile:this.props.idFileSelected
    };
    this.handlerSelectedFile = this.handlerSelectedFile.bind(this);  
    this.setIdFileSelected = this.setIdFileSelected.bind(this);  
    this.getPosts = this.getPosts.bind(this);     
  }
  handlerSelectedFile(idFile, content){
    this.setState(() => ({ idSelectedFile: idFile}))
    this.props.onSelectedFile_SideBar(idFile, content);
  }
  getPosts() {
      API.fetchFiles()
          .then(res => {
              return res.json().then(filesCollection => {
                  var ifSF = this.state.idSelectedFile;    
                  if((filesCollection.data!=undefined && filesCollection.data.length>0) && ifSF==-1)
                  {
                      ifSF = filesCollection.data[0].id;
                  }
                  this.setState(() => ({
                      files:((filesCollection.data!=undefined)?filesCollection.data:[]),
                      idSelectedFile:ifSF
                  }));
              });
          })
          .catch(err => {
              this.setState(() => ({ error: err }));
          });
  }
  componentDidMount() {
      this.getPosts();
  }
  setIdFileSelected(idFile) {
      this.setState(() => ({ idSelectedFile: idFile }));
  }
  render() {
    let instanceParent = this;
    return (
      <div className="FilesContainer">      
        
        {this.state.files.map(function(fileElement) {
          return (
            <File
              key={fileElement.id}
              fileId={fileElement.id}
              name={fileElement.name}
              content={fileElement.content}
              date={fileElement.dateUpdate}
              selected={instanceParent.state.idSelectedFile===fileElement.id}
              onSelectedFile={instanceParent.handlerSelectedFile}
            />
          );
        })}

      </div>
    );
  }
}
export default FilesBar;
