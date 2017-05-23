// @flow

// Render
import React from "react";
import "../styles/SettingsField.styl";

// Types
import type { settingsField } from "../constants/flowTypes";

/**
 * Generates a field for the settings menu.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const SettingsField = ({
  name,
  field,
  handleBlur,
  handleChange,
  handleFocus
}: {
  name: string,
  field: settingsField,
  handleBlur: Function,
  handleChange: Function,
  handleFocus: Function
}) => {
  const { value, label, type } = field;
  const unit = field.unit || undefined;

  return (
    <div className="settings-field" key={name}>
      <label htmlFor={name}>{label}</label>
      <div className="entry-area">
        <input
          className="input"
          id={name}
          name={name}
          onBlur={handleBlur}
          onChange={(event: Event): void => handleChange(event, name)}
          onFocus={handleFocus}
          type={type}
          value={value}
        />
        <span className="unit">{unit}</span>
      </div>
    </div>
  );
};

export default SettingsField;
