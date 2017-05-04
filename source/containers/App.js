// Render
import React, { Component } from "react";
import "../styles/App.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import generateNextTrackId from "../actions/generateNextTrackId";
import selectedTrackShift from "../actions/selectedTrackShift";
import toggleFiltersMenu from "../actions/toggleFiltersMenu";
import toggleSettingsMenu from "../actions/toggleSettingsMenu";

// Selectors
import longestTrackLength from "../selectors/longestTrackLength";

// Libraries
import keyboard from "keyboardjs";

// Components
import Header from "../components/Header";
import Filters from "../components/Filters";
import Tracks from "../components/Tracks";
import Settings from "../containers/Settings";
import SeekBar from "../containers/SeekBar";

/**
 * This used to be called "Tracks" but was refactored to be the main app since everything was
 * happening here anyway.
 */
class App extends Component {
  constructor(props) {
    super(props);
    props.generateNextTrackId();
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { settings, selectedTrackShift } = this.props;
    const { play, nextTrack, previousTrack } = settings;
    keyboard.bind([play.value, "space"], this.togglePlay);
    keyboard.bind(nextTrack.value, () => selectedTrackShift(1));
    keyboard.bind(previousTrack.value, () => selectedTrackShift(-1));
  }

  render() {
    const {
      filtersOpen,
      trackList,
      toggleSettingsMenu,
      toggleFiltersMenu,
      view
    } = this.props;

    return (
      <div className="app">
        <Header
          toggleFiltersMenu={toggleFiltersMenu}
          toggleSettingsMenu={toggleSettingsMenu}
        />
        <main>
          <Filters open={filtersOpen} />
          <Tracks trackList={trackList} view={view} />
          <Settings />
        </main>
        <footer>
          <SeekBar />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    seekPosition: state.tracks.seekPosition,
    filtersOpen: state.ui.filtersOpen,
    settings: state.settings,
    trackList: state.tracks.trackList,
    view: state.tracks.view
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleFiltersMenu: toggleFiltersMenu,
      toggleSettingsMenu: toggleSettingsMenu,
      generateNextTrackId: generateNextTrackId,
      selectedTrackShift: selectedTrackShift,
      longestTrackLength: longestTrackLength
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
