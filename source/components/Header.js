// @flow

// Render
import React from "react";
import "../styles/Header.styl";

// Components
import Icon from "../components/Icon";
import ToolBar from "../components/ToolBar";
import AddTrack from "../containers/AddTrack";

// Images
import logo from "../images/logo.svg";

/**
 * Loads the header containing some higher level functions, especially those
 * concerning UI.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const Header = ({ toggleSettingsMenu }: { toggleSettingsMenu: Function }) => (
  <header className="header">
    <div className="main-bar">
      <img alt="Valence Logo" className="logo" src={logo} />
      <h1>Vam Editor</h1>
      <button>
        <Icon icon="file_download" />
      </button>
      <AddTrack />
      <button className="toggle-settings" onClick={toggleSettingsMenu}>
        <Icon icon="settings" />
      </button>
    </div>
    <ToolBar handleSplit={undefined} />
  </header>
);

export default Header;
