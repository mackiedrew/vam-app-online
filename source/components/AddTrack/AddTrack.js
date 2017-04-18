import React, { Component } from "react";
import "./AddTrack.styl";

// Library Imports
import shortid from "shortid";

class AddTrack extends Component {

  constructor(props) {
    super(props);
    
    const uniqueId = shortid.generate();

    this.state = {
      id: uniqueId
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    const { handleTrackAdd } = this.props;
    const { id } = this.state;
    const selectedFile = document.getElementById(id).files[0];
    console.log(selectedFile);
    handleTrackAdd(selectedFile.path);
  }

  render() {

    const { disabled } = this.props;
    const { id } = this.state;

    return (
      <div className="add-track">
        <label htmlFor={id}>Add Track</label>
        <input
          // accept only takes MIME types, these are MIME types accepted by Web Audio in Chrome
          accept="audio/wav,audio/mpeg,audio/ogg"
          disabled={disabled}
          id={id}
          name={id}
          type="file"
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default AddTrack;
