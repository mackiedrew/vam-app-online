// Render
import React, { Component } from "react";
import "../styles/AddTrack.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import addTrack from "../actions/addTrack";

// Libraries
import { range } from "../help/collections";
import { clearFileInput } from "../help/dom";

// Components
import Icon from "../components/Icon";

/**
 * Handles adding tracks to the page.
 * 
 * @extends React.Component
 */
export class AddTrack extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    const { addTrack, nextTrackId } = this.props;
    const inputTag = document.getElementById(nextTrackId);
    const selectedFiles = inputTag.files;
    const numberOfFiles = selectedFiles.length;
    const fileRange = range(numberOfFiles);
    const selectedFileURLs = fileRange.map(i =>
      URL.createObjectURL(selectedFiles[i])
    );
    const newTrackList = fileRange.map(i => ({
      fileName: selectedFiles[i].name,
      url: selectedFileURLs[i],
      type: selectedFiles[i].type
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

export const mapStateToProps = state => {
  return {
    nextTrackId: state.tracks.nextTrackId
  };
};

export const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addTrack: addTrack
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);
