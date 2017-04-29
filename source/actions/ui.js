// Action Types
export const SHOW_SETTINGS = "UI/SHOW_SETTINGS";
export const HIDE_SETTINGS = "UI/HIDE_SETTINGS";
export const TOGGLE_SETTINGS = "UI/TOGGLE_SETTINGS";

export const SHOW_FILTERS = "UI/SHOW_FILTERS";
export const HIDE_FILTERS = "UI/HIDE_FILTERS";
export const TOGGLE_FILTERS = "UI/TOGGLE_FILTERS";

// Action Creators
export const showSettings = () => ({ type: SHOW_SETTINGS });
export const hideSettings = () => ({ type: HIDE_SETTINGS });
export const toggleSettings = () => ({ type: TOGGLE_SETTINGS });

export const showFilters = () => ({ type: SHOW_FILTERS });
export const hideFilters = () => ({ type: HIDE_FILTERS });
export const toggleFilters = () => ({ type: TOGGLE_FILTERS });
