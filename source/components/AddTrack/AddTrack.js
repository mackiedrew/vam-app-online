import React, { Component } from "react";
import "./AddTrack.styl";

// Libraries
import shortid from "shortid";

// Components
import AddIcon from "../../images/add.svg";

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
    handleTrackAdd(selectedFile);
  }

  render() {

    const { id } = this.state;

    return (
      <div className="add-track">
        <label htmlFor={id}><AddIcon height={24} width={24} /></label>
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
