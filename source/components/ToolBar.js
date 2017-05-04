import React, { Component } from "react";
import "../styles/ToolBar.styl";

// Components
import Icon from "../components/Icon";

/**
 * Toolbar should display currently selected tool in mouse or keyboard mode. And allow for tool
 * selection as well.
 */
class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.handleSplit = this.handleSplit.bind(this);
  }

  handleSplit() {
    const { handleSplit } = this.props;
    handleSplit();
  }

  render() {
    return (
      <div className="tool-bar">
        <button className="split-grain" onClick={this.handleSplit}>
          <Icon icon="call_split" size={16} />
        </button>
      </div>
    );
  }
}

export default ToolBar;
