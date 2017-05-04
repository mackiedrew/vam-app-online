import { SET_VIEW } from "../constants/actionTypes";
// import longestTrackLength from "../selectors/longestTrackLength";
// import { clamp } from "../help/generic";

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
    // const { start, end } = view;
    // const maxView = 1;
    // const clampedStart = clamp(start, 0, maxView);
    // const clampedEnd = clamp(end, start, maxView);

    // const clampedView = {
    //   ...view,
    //   start: clampedStart,
    //   end: clampedEnd
    // };

    dispatch(setViewAsync(view));
  };
};

export default setView;
