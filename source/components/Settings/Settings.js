import React, { Component } from "react";
import "./Settings.styl";

import config from "../../config";

class Settings extends Component {
  constructor(props) {
    // Initialize extended class with passed props
    super(props);
  }

  settingsClass(open) {
    return open ? "settings-open" : "settings-closed";
  }

  generateFields() {
    return Object.keys(config).map((name) => {
      const {value, unit, label, type} = config[name];

      return (
        <div className="field" key={name}>
          <label htmlFor={name}>{label}</label>
          <div className="entry-area">
            <input
              className="input"
              id={name}
              name={name}
              type="number"
              value={value}
            />
            <span className="unit">{unit}</span>
          </div>
        </div>
      );
    });
  }

  render() {
    // Break out values for the sake of easier template reading
    const { open } = this.props;
    const extraClass = this.settingsClass(open);

    return (
      <aside className={`settings ${extraClass}`}>
        <fieldset>
          {this.generateFields()}
        </fieldset>
      </aside>
    );
  }
}

export default Settings;
