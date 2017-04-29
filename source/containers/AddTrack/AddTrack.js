import React, { Component } from "react";
import "./AddTrack.styl";

// Libraries
import { range } from "../../help/generic/generic";

// Components
import Icon from "../../components/Icon/Icon";

class AddTrack extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  // Handles change change in upload location.
  handleOnChange() {
    // Breakout deeper than 1-level references
    const { handleTrackAdd, id } = this.props;
    // Find the file input tag by ID to read file from it.
    const inputTag = document.getElementById(id);
    // Construct easy object for adding tracks to the system.
    const selectedFiles = inputTag.files;
    const numberOfFiles = selectedFiles.length;
    const fileRange = range(numberOfFiles);
    const selectedFileURLs = fileRange.map(i =>
      URL.createObjectURL(selectedFiles[i])
    );
    const trackList = fileRange.map(i => ({
      file: selectedFiles[i],
      url: selectedFileURLs[i]
    }));
    handleTrackAdd(trackList);
    // Reset the file contents through this silly hack. It's illegal to change file input manually.
    inputTag.type = "";
    inputTag.value = "";
    inputTag.type = "file";
  }

  render() {
    const { id } = this.props;

    return (
      <div className="add-track">
        <label htmlFor={id}>
          <Icon icon="add_circle" />
        </label>
        <input
          // accept only takes MIME types, these are MIME types accepted by Web Audio in Chrome
          accept="audio/wav,audio/mpeg,audio/ogg"
          id={id}
          name={id}
          onChange={this.handleOnChange}
          type="file"
          multiple
        />
      </div>
    );
  }
}

export default AddTrack;
