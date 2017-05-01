import { TOGGLE_SETTINGS_MENU } from "../constants/actionTypes";

// Action Creator
const toggleSettingsMenuAsync = () => ({ type: TOGGLE_SETTINGS_MENU });

// Thunk
const toggleSettingsMenu = () => {
  return dispatch => {
    dispatch(toggleSettingsMenuAsync());
  };
};

export default toggleSettingsMenu;
