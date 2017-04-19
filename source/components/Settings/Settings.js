import React, { Component } from "react";
import "./Settings.styl";

class Settings extends Component {
  constructor(props) {
    // Initialize extended class with passed props
    super(props);
  }

  settingsStyle (open) {
    return open ? { width: "200px" } : { width: "0" };
  }

  render() {
    // Break out values for the sake of easier template reading
    const { open } = this.props;

    return (
      <aside className="settings" style={this.settingsStyle(open)}>
        Settings
      </aside>
    );
  }
}

export default Settings;
