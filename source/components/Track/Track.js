/* eslint-env node */
import React, { Component } from "react";
import "./Track.styl";

// Helpers
import { richReadWav } from "../../help/wav/wav";
import { divisionBinarySearch } from "../../help/generic/generic";

// Components
import Waveform from "../../containers/Waveform/Waveform";
import Loading from "../../containers/Loading/Loading";
import ToggleButton from "../../containers/ToggleButton/ToggleButton";
import Icon from "../../containers/Icon/Icon";

/**
 * <Track /> should take in a simple path to a to a file and generate logical divisions and pass
 * down any display options to allow
 */
class Track extends Component {
  constructor(props) {
    super(props);

    const fileName = props.file.name;

    // Format wrapper ID name for consistent reference
    this.wrapperID = `track-${props.id}`;

    // Use separate value to allow for easy reset
    this.initialState = {
      name: fileName,
      error: undefined,
      sampleRate: undefined,
      trackLength: undefined,
      maxAmplitude: undefined,
      grains: []
    };

    // Set state to initialState
    this.state = this.initialState;

    // Read wav data from provided path
    this.readPath().then(({ trackLength }) => {
      props.reportTrackLength(props.id, trackLength);
    });

    // Bind functions
    this.readPath = this.readPath.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.generateSeekLineStyle = this.generateSeekLineStyle.bind(this);
    this.handleSelectTrack = this.handleSelectTrack.bind(this);
  }

  /**
   * Convert sample number into grain index number for this track.
   * @param {Number} sample Sample number to target in search
   */
  sampleToGrain(sample) {
    // Breakout values more than 2 layers deep for easy reference
    const { grains, trackLength } = this.state;
    const grainIndex = divisionBinarySearch(sample, grains, trackLength);
    return grainIndex;
  }

  /**
   * Read important information from the wav file and place it into state. Or store an error.
   */
  readPath() {
    const { file } = this.props;
    return richReadWav(file)
      .then((wavData) => {
        this.setState({ ...wavData });
        return wavData;
      })
      .catch(error => this.setState({ error: String(error) }));
  }

  /**
   * Generate the in-line style object for programmatically determining the position of the
   * the seek line based on some % left of the screen taking into account the viewport.
   */
  generateSeekLineStyle() {
    // Breakout any 2-layer-deep values for easy reference
    const { trackLength } = this.state;
    const { view, seek } = this.props;
    // Figure out operation end point, fall back to trackLength if view.end hasn't come in yet.
    const endPoint = view.end || trackLength;
    // Figure out % of parent width to cover
    const seekPercentageInView = (seek - view.start) / endPoint * 100;
    // Generate style object
    const seekLineStyle = { left: `${seekPercentageInView}%` };
    return seekLineStyle;
  }

  // Button handleClick functions
  handleRemoveButton() {
    this.props.remove(this.props.id);
  }

  handleSelectTrack() {
    const { selectTrack, id } = this.props;
    selectTrack(id);
  }

  render() {
    // Break out values for the sake of easier template reading
    const { name, grains, maxAmplitude, error } = this.state;
    const { seekTo, selected, view, id, toggleMute } = this.props;


    const grainsToShow = grains.length > 0 && (() => {
      const lastGrainIndex = grains.length - 1; 
      const firstGrainToShowIndex =  this.sampleToGrain(view.start);
      const lastGrainToShowIndex =  this.sampleToGrain(view.end) || lastGrainIndex;
      const firstGrainToShow = grains[firstGrainToShowIndex];
      const lastGrainToShow = grains[lastGrainToShowIndex];
      const moreStart = firstGrainToShowIndex !== 0;
      const moreEnd = lastGrainIndex !== lastGrainToShowIndex;

      const startFiller = [{
        start: view.start,
        end: firstGrainToShow.start,
        filler: true,
        more: moreStart,
      }];
      const endFiller = [{
        start: lastGrainToShow.end,
        end: view.end,
        filler: true,
        more: moreEnd,
      }];
      const grainsToShow = [
        ...startFiller,
        ...grains.slice(firstGrainToShowIndex, lastGrainToShowIndex + 1),
        ...endFiller,
      ];
      return grainsToShow;
    })();

    // Generate styles
    const seekLineStyle = this.generateSeekLineStyle();

    const nameStyle = selected ? { fontWeight: 700 } : { fontWeight: 200 };
    const displayStyle = selected ?
      { borderTop: "2px solid rgba(255,193,7,1)", borderBottom: "2px solid rgba(255,193,7,1)" } :
      { borderTop: "2px solid rgb(240, 240, 240)", borderBottom: "2px solid rgb(240, 240, 240)" };

    return (
      <div className="track" id={this.wrapperID}>
        <div className="controls">
          <div>
            <ToggleButton
              offContents={<Icon icon="radio_button_unchecked" />}
              offFunction={this.handleSelectTrack}
              on={selected}
              onContents={<Icon icon="radio_button_checked" />}

            />
            <ToggleButton
              offContents={<Icon icon="volume_off" />}
              offFunction={() => toggleMute(id)}
              on={selected}
              onContents={<Icon icon="volume_up" />}
              onFunction={() => toggleMute(id)}
            />
          </div>
          <span className="name" style={nameStyle}>{name}</span>
          <button className="remove" onClick={this.handleRemoveButton}>
            <Icon icon="delete_forever" />
          </button>
        </div>
        <div className="display" style={displayStyle}>
          { maxAmplitude ? "" : <Loading /> }
          { error ? <strong className="error">{error}</strong> : "" }
          <div className="seek-line" style={seekLineStyle} />
          <Waveform
            blocks={grainsToShow}
            maxAmplitude={maxAmplitude}
            seekTo={seekTo}
            view={view}
          />
        </div>
      </div>
    );
  }
}

export default Track;
