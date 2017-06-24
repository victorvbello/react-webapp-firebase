import React, {Component} from 'react';

class FileUpload extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <progress value={this.props.percentage} max="100"></progress>
        <br/>
        <input type="file" onChange={this.props.onUpload}/>
      </div>
    );
  }
}

export default FileUpload