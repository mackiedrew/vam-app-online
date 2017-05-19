// @flow

// Flow Types
import type {
  State,
  Dispatch,
  viewType,
  ModalTypes
} from "../constants/flowTypes";

// Render
import React, { Component } from "react";
import "../styles/App.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import generateNextTrackId from "../actions/generateNextTrackId";
import toggleSettingsMenu from "../actions/toggleSettingsMenu";

// Components
import Header from "../components/Header";
import Tracks from "../components/Tracks";
import TimeBar from "../components/TimeBar";

// Containers
import Settings from "../containers/Settings";
import SeekBar from "../containers/SeekBar";
import ModalManager from "../containers/ModalManager";

/**
 * This used to be called "Tracks" but was refactored to be the main app since
 * everything was happening here anyway.
 * 
 * @extends React.Component
 */
export class App extends Component {
  constructor(props: {
    trackList: Object,
    view: viewType,
    modalType: ModalTypes,
    modalData: Object,
    generateNextTrackId: Function,
    toggleSettingsMenu: Function
  }) {
    super(props);
    props.generateNextTrackId();
  }

  render() {
    const { trackList, toggleSettingsMenu, view } = this.props;

    return (
      <div className="app">
        <Header toggleSettingsMenu={toggleSettingsMenu} />
        <main>
          <div className="tracks-container">
            <TimeBar view={view} />
            <Tracks trackList={trackList} />
          </div>
          <Settings />
        </main>
        <footer>
          <SeekBar />
        </footer>
        <ModalManager />
      </div>
    );
  }
}

export const mapStateToProps = (state: State): Object => {
  return {
    seekPosition: state.tracks.seekPosition,
    trackList: state.tracks.trackList,
    view: state.tracks.view,
    settings: state.settings
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): Function => {
  return bindActionCreators(
    {
      toggleSettingsMenu: toggleSettingsMenu,
      generateNextTrackId: generateNextTrackId
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
