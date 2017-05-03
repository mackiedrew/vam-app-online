// Render
import React, { Component } from "react";
import "./AddTrack.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import addTrack from "../../actions/addTrack";

// Libraries
import { range } from "../../help/generic/generic";
import { clearFileInput } from "../../help/dom/dom";

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
    const { addTrack, nextTrackId } = this.props;
    // Find the file input tag by ID to read file from it.
    const inputTag = document.getElementById(nextTrackId);
    // Construct easy object for adding tracks to the system.
    const selectedFiles = inputTag.files;
    const numberOfFiles = selectedFiles.length;
    const fileRange = range(numberOfFiles);
    const selectedFileURLs = fileRange.map(i =>
      URL.createObjectURL(selectedFiles[i])
    );
    const newTrackList = fileRange.map(i => ({
      fileName: selectedFiles[i].name,
      url: selectedFileURLs[i]
    }));
    newTrackList.forEach(addTrack);
    clearFileInput(inputTag);
  }

  render() {
    const { nextTrackId } = this.props;

    return (
      <div className="add-track">
        <label htmlFor={nextTrackId}>
          <Icon icon="add_circle" />
        </label>
        <input
          // accept only takes MIME types, these are MIME types accepted by Web Audio in Chrome
          accept="audio/wav"
          id={nextTrackId}
          name={nextTrackId}
          onChange={this.handleOnChange}
          type="file"
          multiple
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nextTrackId: state.tracks.nextTrackId
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addTrack: addTrack
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);
