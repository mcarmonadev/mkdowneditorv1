import React, { Component } from "react";

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.loadFile = this.loadFile.bind(this);
    this.formatFileDate = this.formatFileDate.bind(this);
  }
  loadFile() {
  	this.props.onSelectedFile(this.props.fileId, this.props.content);
  }
  addZero(value) {
	  if (value < 10) {value = "0" + value; } return value;
  }

  formatFileDate(value) {

    var date = new Date(value);
		var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
		];

		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();

		var h = this.addZero(date.getHours());
		var m = this.addZero(date.getMinutes());
		var s = this.addZero(date.getSeconds());

		return day + ' ' + monthNames[monthIndex] + ' ' + year + ' '+h+':'+m+':'+s;

	}

  componentDidMount() {
    if(this.props.selected){
      this.loadFile();      
    }
  }

  render() {
  	let fileClasses = ["FileElement"];if(this.props.selected)fileClasses.push('FileElement_selected');
    return (
      <div className={fileClasses.join(' ')}  onClick={this.loadFile} >
      	<div className="FileIco"><img src="/images/file.png" alt="{this.props.name}" height="42" width="42"/>
      	</div>
      	<div className="FileLabel">
      		<div className="FileName">{this.props.name} 
      		</div>   
      		<div className="FileDate">{this.formatFileDate(this.props.date)}
      		</div>       
      	</div>     
      </div>
    );
  }
}

export default File;
