// Actions
import { SET_SEEK_POSITION, SET_VIEW } from "../constants/actionTypes";

// Initial State
const DEFAULT_STATE = {
  seekPosition: 0,
  length: 44100 * 60 * 10,
  view: {
    start: 0,
    end: 44100 * 60 * 10
  }
};

// Actual Reducer
const TracksReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
  case SET_SEEK_POSITION:
    return {
      ...state,
      seekPosition: payload
    };
  case SET_VIEW:
    return {
      ...state,
      view: payload
    };
  default:
    return state;
  }
};

export default TracksReducer;
