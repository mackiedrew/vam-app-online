import { SET_VIEW } from "../constants/actionTypes";

// Action Creator
const setViewAsync = view => {
  return {
    type: SET_VIEW,
    payload: view
  };
};

// Thunk
const setView = view => {
  return dispatch => {
    dispatch(setViewAsync(view));
  };
};

export default setView;
