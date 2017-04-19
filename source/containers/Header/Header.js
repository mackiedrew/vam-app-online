import React from "react";
import "./Header.styl";

// Components
import DownloadIcon from "../../images/download.svg";

/**
 * The role of the <Waveform /> container is aggregate data, using libraries and provided data into
 * a pretty display format. It should not do a lot of the heavy lifting, most of it should be given
 * to a library for processing or provided directly through the props.
 */
const Header = (props) => (
  <header className="header">
    <h1>VAM</h1>
    <button><DownloadIcon height="24" width="24" /></button>
    {props.children}
  </header>
);

export default Header;
