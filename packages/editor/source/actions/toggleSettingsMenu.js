// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { TOGGLE_SETTINGS_MENU } from "../constants/actionTypes";

/**
 * Action creator: creates an action that toggles whether the settings menu is
 * open.
 * 
 * @returns {Object} Action: toggles whether the settings menu is open.
 */
const toggleSettingsMenu = (): Action => {
  return { type: TOGGLE_SETTINGS_MENU };
};

export default toggleSettingsMenu;
