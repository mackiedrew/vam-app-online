import { TOGGLE_FILTERS_MENU } from "../constants/actionTypes";

// Action Creator
const toggleFiltersMenuAsync = () => ({ type: TOGGLE_FILTERS_MENU });

// Thunk
const toggleFiltersMenu = () => {
  return dispatch => {
    dispatch(toggleFiltersMenuAsync());
  };
};

export default toggleFiltersMenu;
