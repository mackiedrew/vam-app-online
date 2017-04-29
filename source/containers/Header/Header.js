import React from "react";
import { connect } from "react-redux";
import "./Header.styl";

// Components
import Icon from "../../components/Icon/Icon";
import ToolBar from "../../components/ToolBar/ToolBar";

// Action Creators
import { toggleSettings, toggleFilters } from "../../actions/ui";

/**
 * The role of the <Waveform /> container is aggregate data, using libraries and provided data into
 * a pretty display format. It should not do a lot of the heavy lifting, most of it should be given
 * to a library for processing or provided directly through the props.
 */
const Header = props => (
  <header className="header">
    <div className="main-bar">
      <button onClick={props.toggleFilters}>
        <Icon icon="library_add" />
      </button>
      <h1>VAM</h1>
      <button>
        <Icon icon="file_download" />
      </button>
      {props.children}
      <button onClick={props.toggleSettings}>
        <Icon icon="settings" />
      </button>
    </div>
    <ToolBar />
  </header>
);

const mapDispatchToProps = dispatch => {
  return {
    toggleSettings: () => {
      dispatch(toggleSettings());
    },
    toggleFilters: () => {
      dispatch(toggleFilters());
    }
  };
};


export default connect(null, mapDispatchToProps)(Header);
