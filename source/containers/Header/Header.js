// Render
import React from "react";
import "./Header.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import toggleFiltersMenu from "../../actions/toggleFiltersMenu";
import toggleSettingsMenu from "../../actions/toggleSettingsMenu";

// Components
import Icon from "../../components/Icon/Icon";
import ToolBar from "../../components/ToolBar/ToolBar";


/**
 * The role of the <Waveform /> container is aggregate data, using libraries and provided data into
 * a pretty display format. It should not do a lot of the heavy lifting, most of it should be given
 * to a library for processing or provided directly through the props.
 */
const Header = props => (
  <header className="header">
    <div className="main-bar">
      <button onClick={props.toggleFiltersMenu}>
        <Icon icon="library_add" />
      </button>
      <h1>VAM</h1>
      <button>
        <Icon icon="file_download" />
      </button>
      {props.children}
      <button onClick={props.toggleSettingsMenu}>
        <Icon icon="settings" />
      </button>
    </div>
    <ToolBar />
  </header>
);

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleFiltersMenu: toggleFiltersMenu,
    toggleSettingsMenu: toggleSettingsMenu
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Header);
