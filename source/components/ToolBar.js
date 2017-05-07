// @flow

// Render
import React, { Component } from "react";
import "../styles/ToolBar.styl";

// Components
import Icon from "../components/Icon";

/**
 * Toolbar should display currently selected tool in mouse or keyboard mode.
 * And allow for tool selection as well.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
class ToolBar extends Component {
  // Flow Types
  props: { handleSplit: () => {} | void };
  handleSplitButton: () => void;

  constructor(props: {}) {
    super(props);
    this.handleSplitButton = this.handleSplitButton.bind(this);
  }

  handleSplitButton() {
    this.props.handleSplit();
  }

  render() {
    return (
      <div className="tool-bar">
        <button className="split-grain" onClick={this.handleSplitButton}>
          <Icon icon="call_split" size={16} />
        </button>
      </div>
    );
  }
}

export default ToolBar;
