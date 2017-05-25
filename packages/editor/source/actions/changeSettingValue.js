// @flow

// Flow Types
import type { Action, settingsValue } from "../constants/flowTypes";

// Action Type
import { CHANGE_SETTING_VALUE } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets the value of specified setting.
 * 
 * @param {string} setting The name of the setting to set the value of.
 * @param {any} value The value to the setting.
 * @returns {Object} Action: sets the value of specified setting.
 */
const changeSettingValue = (setting: string, value: settingsValue): Action => {
  return {
    type: CHANGE_SETTING_VALUE,
    payload: {
      setting,
      value
    }
  };
};

export default changeSettingValue;
