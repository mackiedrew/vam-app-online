import React from "react";
import "./Header.styl";

// Components
import Icon from "../../containers/Icon/Icon";

/**
 * The role of the <Waveform /> container is aggregate data, using libraries and provided data into
 * a pretty display format. It should not do a lot of the heavy lifting, most of it should be given
 * to a library for processing or provided directly through the props.
 */
const Header = props => (
  <header className="header">
    <button onClick={props.toggleFilter}>
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
  </header>
);

export default Header;
