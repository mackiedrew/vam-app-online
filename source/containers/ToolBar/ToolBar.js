import React from "react";
import "./ToolBar.styl";

// Components
import Icon from "../Icon/Icon";

/**
 * Toolbar should display currently selected tool in mouse or keyboard mode. And allow for tool
 * selection as well.
 */
const ToolBar = () =>
  <div className="tool-bar">
    <button className="split_grain">
      <Icon icon="call_split" size={16} />
    </button>
  </div>;


export default ToolBar;
