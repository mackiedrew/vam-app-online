// Action Types
export const RESET_SETTINGS = "SETTINGS/RESET_SETTINGS";
export const CHANGE_SETTING_VALUE = "SETTINGS/CHANGE_SETTING_VALUE";

// Action Creators
export const resetSettings = () => ({ type: RESET_SETTINGS });
export const changeSettingValue = (setting, value) => ({ 
  type: CHANGE_SETTING_VALUE, 
  setting,
  value
});
