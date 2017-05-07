// Render
import React, { Component } from "react";
import "../styles/App.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import generateNextTrackId from "../actions/generateNextTrackId";
import toggleFiltersMenu from "../actions/toggleFiltersMenu";
import toggleSettingsMenu from "../actions/toggleSettingsMenu";

// Components
import Header from "../components/Header";
import Filters from "../components/Filters";
import Tracks from "../components/Tracks";

// Containers
import Settings from "../containers/Settings";
import SeekBar from "../containers/SeekBar";

/**
 * This used to be called "Tracks" but was refactored to be the main app since
 * everything was happening here anyway.
 * 
 * @extends React.Component
 */
export class App extends Component {
  constructor(props) {
    super(props);
    props.generateNextTrackId();
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

export const mapStateToProps = state => {
  return {
    seekPosition: state.tracks.seekPosition,
    trackList: state.tracks.trackList,
    view: state.tracks.view,
    filtersOpen: state.ui.filtersOpen,
    settings: state.settings
  };
};

export const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleFiltersMenu: toggleFiltersMenu,
      toggleSettingsMenu: toggleSettingsMenu,
      generateNextTrackId: generateNextTrackId
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
