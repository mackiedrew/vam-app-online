// Render
import React from "react";
import "../styles/Header.styl";

// Components
import Icon from "../components/Icon";
import ToolBar from "../components/ToolBar";
import AddTrack from "../containers/AddTrack";

/**
 * Loads the header containing some higher level functions, especially those concerning UI.
 * 
 * @param {Object} props Pass button functions down in props.
 */
const Header = ({ toggleFiltersMenu, toggleSettingsMenu }) => (
  <header className="header">
    <div className="main-bar">
      <button className="toggle-filters" onClick={toggleFiltersMenu}>
        <Icon icon="library_add" />
      </button>
      <h1>VAM</h1>
      <button>
        <Icon icon="file_download" />
      </button>
      <AddTrack />
      <button className="toggle-settings" onClick={toggleSettingsMenu}>
        <Icon icon="settings" />
      </button>
    </div>
    <ToolBar />
  </header>
);

export default Header;
