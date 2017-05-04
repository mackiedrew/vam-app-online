import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../styles/Settings.styl";

// Action creators
import changeSettingValue from "../actions/changeSettingValue";

class Settings extends Component {
  constructor(props) {
    // Initialize extended class with passed props
    super(props);
    this.generateFields = this.generateFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, settingName) {
    const { changeSetting } = this.props;
    const { value } = event.target;
    event.preventDefault();
    changeSetting(settingName, value);
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
              onChange={event => this.handleChange(event, name)}
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      changeSetting: changeSettingValue
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
