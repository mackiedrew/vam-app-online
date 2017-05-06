// Render
import React from "react";
import "../styles/SettingsField.styl";

/**
 * Generates a field for the settings menu.
 * 
 * @param {Object} props Provided properties from react JSX.
 */
const SettingsField = ({ name, field, handleChange }) => {
  const { value, unit, label, type } = field;

  return (
    <div className="settings-field" key={name}>
      <label htmlFor={name}>{label}</label>
      <div className="entry-area">
        <input
          className="input"
          id={name}
          name={name}
          onChange={event => handleChange(event, name)}
          type={type}
          value={value}
        />
        <span className="unit">{unit}</span>
      </div>
    </div>
  );
};

export default SettingsField;
