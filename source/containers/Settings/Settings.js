import React, { Component } from "react";
import { connect } from "react-redux";
import "./Settings.styl";

class Settings extends Component {
  constructor(props) {
    // Initialize extended class with passed props
    super(props);
    this.generateFields = this.generateFields.bind(this);
  }

  settingsClass(open) {
    return open ? "settings-open" : "settings-closed";
  }

  generateFields() {
    const { settings } = this.props;
    return Object.keys(settings).map(name => {
      const { value, unit, label, type } = settings[name];

      return (
        <div className="field" key={name}>
          <label htmlFor={name}>{label}</label>
          <div className="entry-area">
            <input
              className="input"
              id={name}
              name={name}
              type={type}
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

const mapStateToProps = state => {
  return {
    open: state.ui.settingsOpen,
    settings: state.settings
  };
};

export default connect(mapStateToProps)(Settings);
