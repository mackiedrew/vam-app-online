// Render
import React, { Component } from "react";
import "../styles/Settings.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import changeSettingValue from "../actions/changeSettingValue";
import setOperationHotkey from "../actions/setOperationHotkey";

// Components
import SettingsField from "../components/SettingsField";

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleHotkeyChange = this.handleHotkeyChange.bind(this);
  }

  handleSettingsChange(event, settingName) {
    const { changeSetting } = this.props;
    const { value } = event.target;
    event.preventDefault();
    changeSetting(settingName, value);
  }

  handleHotkeyChange(event, operationName) {
    const { changeHotkey } = this.props;
    const { value } = event.target;
    event.preventDefault();
    changeHotkey(operationName, value);
  }

  settingsClass(open) {
    return open ? "settings-open" : "settings-closed";
  }

  generateFields(fields, handleChange) {
    return Object.keys(fields).map(name => (
      <SettingsField
        field={fields[name]}
        handleChange={handleChange}
        key={name}
        name={name}
      />
    ));
  }

  render() {
    // Break out values for the sake of easier template reading
    const { open, hotkeys, settings } = this.props;
    const extraClass = this.settingsClass(open);

    return (
      <aside className={`settings ${extraClass}`}>
        <fieldset>
          {this.generateFields(settings, this.handleSettingsChange)}
          {this.generateFields(hotkeys, this.handleHotkeyChange)}
        </fieldset>
      </aside>
    );
  }
}

export const mapStateToProps = state => {
  return {
    open: state.ui.settingsOpen,
    settings: state.settings,
    hotkeys: state.keyboard
  };
};

export const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      changeSetting: changeSettingValue,
      changeHotkey: setOperationHotkey
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
