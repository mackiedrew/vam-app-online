// Action Type
import { TOGGLE_FILTERS_MENU } from "../constants/actionTypes";

/**
 * Action creator: creates an action that toggles whether the filters menu is open.
 * @returns {Object} Action: toggles whether the filters menu is open.
 */
const toggleFiltersMenu = () => ({ type: TOGGLE_FILTERS_MENU });

export default toggleFiltersMenu;
