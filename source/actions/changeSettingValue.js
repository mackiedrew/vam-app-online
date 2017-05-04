import { CHANGE_SETTING_VALUE } from "../constants/actionTypes";

// Action Creator
const changeSettingValueAsync = changedSetting => {
  return {
    type: CHANGE_SETTING_VALUE,
    payload: changedSetting
  };
};

// Thunk
const changeSettingValue = (setting, value) => {
  return (dispatch, getState) => {
    const settings = getState().settings;
    const currentSetting = settings[setting];
    const newSetting = {
      ...currentSetting,
      value
    };
    const payload = {
      name: setting,
      value: newSetting
    };
    dispatch(changeSettingValueAsync(payload));
  };
};

export default changeSettingValue;
