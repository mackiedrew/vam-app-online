// Action Type
import { TOGGLE_SETTINGS_MENU } from "../constants/actionTypes";

/**
 * Action creator: creates an action that toggles whether the settings menu is open.
 * @returns {Object} Action: toggles whether the settings menu is open.
 */
const toggleSettingsMenu = () => ({ type: TOGGLE_SETTINGS_MENU });

export default toggleSettingsMenu;
