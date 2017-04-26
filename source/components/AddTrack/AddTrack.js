import React, { Component } from "react";
import "./AddTrack.styl";

// Components
import Icon from "../../containers/Icon/Icon";

class AddTrack extends Component {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    const { handleTrackAdd, id } = this.props;
    const selectedFile = document.getElementById(id).files[0];
    const selectedFileURL = URL.createObjectURL(selectedFile);
    handleTrackAdd({ file: selectedFile, url: selectedFileURL});
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
