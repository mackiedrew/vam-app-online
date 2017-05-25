// Render
import React, { Component } from "react";
import "../styles/Settings.styl";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import changeSettingValue from "../actions/changeSettingValue";
import setOperationHotkey from "../actions/setOperationHotkey";
import pauseControls from "../actions/pauseControls";
import resumeControls from "../actions/resumeControls";

// Components
import SettingsField from "../components/SettingsField";

/**
 * Right-side bar which handles settings for track management and controls.
 * 
 * @extends React.Component
 */
export class Settings extends Component {
  constructor(props) {
    super(props);
    // Bind `this` to class methods.
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleHotkeyChange = this.handleHotkeyChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.generateFields = this.generateFields.bind(this);
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

  handleBlur() {
    this.props.resumeControls();
  }

  handleFocus() {
    this.props.pauseControls();
  }

  settingsClass(open) {
    return open ? "open" : "closed";
  }

  generateFields(fields, handleChange, handleBlur, handleFocus) {
    return Object.keys(fields).map(name => (
      <SettingsField
        field={fields[name]}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleFocus={handleFocus}
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
          {this.generateFields(
            settings,
            this.handleSettingsChange,
            this.handleBlur,
            this.handleFocus
          )}
          {this.generateFields(
            hotkeys,
            this.handleHotkeyChange,
            this.handleBlur,
            this.handleFocus
          )}
        </fieldset>
      </aside>
    );
  }
}

export const mapStateToProps = state => {
  return {
    open: state.ui.settingsOpen,
    settings: state.settings,
    hotkeys: state.keyboard.hotkeys
  };
};

export const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      changeSetting: changeSettingValue,
      changeHotkey: setOperationHotkey,
      pauseControls: pauseControls,
      resumeControls: resumeControls
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
