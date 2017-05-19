// @flow

// Flow Types
import type {
  viewType,
  grainArray,
  Settings,
  trackType,
  State,
  Dispatch,
  grainTagArray
} from "../constants/flowTypes";

// Render
import React, { Component } from "react";
import "../styles/Track.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import setTrackSampleRate from "../actions/setTrackSampleRate";
import setTrackGrains from "../actions/setTrackGrains";
import setSeekPosition from "../actions/setSeekPosition";

// Selectors
import maxAmplitudes from "../selectors/maxAmplitudes";
import getGrainTagsFactory from "../selectors/getGrainTagsFactory";
import getVisibleGrainsFactory from "../selectors/getVisibleGrainsFactory";

// Helpers
import { richReadWav } from "../help/wav";

// Components
import Waveform from "../components/Waveform";
import Loading from "../components/Loading";

// Containers
import TrackControls from "../containers/TrackControls";

/**
 * <Track /> should take in a simple path to a to a file and generate logical
 * divisions and pass down any display options to allow
 * @extends React.Component
 */
export class Track extends Component {
  readPath: () => void;
  generateSeekLineStyle: (
    view: viewType,
    seekPosition: number
  ) => { left: string };

  constructor(props: {
    selectedTrack: string,
    view: viewType,
    id: string,
    seekPosition: number,
    trackList: {},
    setSeekPosition: Function,
    maxAmplitudes: {},
    grainTags: grainTagArray,
    visibleGrains: grainArray,
    settings: Settings,
    setTrackSampleRate: Function,
    setTrackGrains: Function
  }) {
    super(props);

    // Read wav data from provided path
    this.readPath();

    // Bind functions
    this.readPath = this.readPath.bind(this);
  }

  /**
   * Read important information from the wav file and place it into state. Or
   * store an error.
   */
  readPath() {
    const {
      trackList,
      settings,
      id,
      setTrackSampleRate,
      setTrackGrains
    } = this.props;
    const { fileName, url }: { fileName: string, url: string } = trackList[id];
    return richReadWav(
      url,
      fileName,
      settings.grain.value,
      settings.quietCutoff.value
    ).then(
      ({ sampleRate, grains }: { sampleRate: number, grains: grainArray }) => {
        setTrackSampleRate(id, sampleRate);
        setTrackGrains(id, grains);
      }
    );
  }

  /**
   * Generate the in-line style object for programmatically determining the
   * position of the the seek line based on some % left of the screen taking
   * into account the viewport.
   * 
   * @param {Object} view An object containing at least start and end keys.
   * @param {number} seekPosition Value of current position of seek in frames.
   * @returns {Object} The new style object for in-line styling.
   */
  generateSeekLineStyle(
    { start, end }: viewType,
    seekPosition: number
  ): { left: string } {
    const seekPercentageInView = (seekPosition - start) / end * 100;
    const seekLineStyle = { left: `${seekPercentageInView}%` };
    return seekLineStyle;
  }

  render() {
    // Break out values for the sake of easier template reading
    const {
      selectedTrack,
      view,
      id,
      seekPosition,
      trackList,
      setSeekPosition,
      maxAmplitudes,
      grainTags,
      visibleGrains
    } = this.props;
    const track: trackType = trackList[id];
    const {
      grains,
      fileName
    }: { grains: grainArray | void, fileName: string } = track;
    const selected: boolean = selectedTrack === id;
    const maxAmplitude: number = maxAmplitudes[id];

    // Generate styles
    const seekLineStyle: {} = this.generateSeekLineStyle(view, seekPosition);

    return (
      <div className="track" id={`track-${id}`}>
        <TrackControls id={id} name={fileName} />
        <div className="display">
          {grains ? "" : <Loading />}
          <div className="seek-line" style={seekLineStyle} />
          <Waveform
            grainTags={grainTags}
            grains={visibleGrains}
            maxAmplitude={maxAmplitude}
            selected={selected}
            setSeekPosition={setSeekPosition}
            view={view}
          />
        </div>
      </div>
    );
  }
}

export const makeMapStateToProps = () => {
  const getGrainTags: Function = getGrainTagsFactory();
  const getVisibleGrains: Function = getVisibleGrainsFactory();
  const mapStateToProps = (state: State, props: {}) => ({
    seekPosition: state.tracks.seekPosition,
    trackList: state.tracks.trackList,
    selectedTrack: state.tracks.selectedTrack,
    view: state.tracks.view,
    settings: state.settings,
    maxAmplitudes: maxAmplitudes(state),
    grainTags: getGrainTags(state, props),
    visibleGrains: getVisibleGrains(state, props)
  });
  return mapStateToProps;
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      setTrackSampleRate: setTrackSampleRate,
      setTrackGrains: setTrackGrains,
      setSeekPosition: setSeekPosition
    },
    dispatch
  );
};

export const mapStateToProps = makeMapStateToProps();

export default connect(mapStateToProps, mapDispatchToProps)(Track);
