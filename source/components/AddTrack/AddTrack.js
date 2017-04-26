import React, { Component } from "react";
import "./AddTrack.styl";

// Components
import Icon from "../../containers/Icon/Icon";

class AddTrack extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  // Handles change change in upload location.
  handleOnChange() {
    const { handleTrackAdd, id } = this.props;
    const inputTag = document.getElementById(id);
    const selectedFile = inputTag.files[0];
    handleTrackAdd(selectedFile);
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
        />
      </div>
    );
  }
}

export default AddTrack;
