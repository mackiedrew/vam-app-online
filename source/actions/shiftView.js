// Action Types
import { SHIFT_VIEW } from "../constants/actionTypes";

// Actions
import setView from "./setView";

// Action Creator
const shiftViewAsync = () => {
  return { type: SHIFT_VIEW };
};

// Thunk
const shiftView = shiftFactor => {
  return (dispatch, getState) => {
    const { view } = getState().tracks;
    const { start, end } = view;
    const viewRange = end - start;
    const viewShift = shiftFactor * viewRange;
    const newStart = Math.ceil(start + viewShift);
    const newEnd = Math.ceil(end + viewShift);
    const newView = {
      ...view,
      start: newStart,
      end: newEnd
    };
    dispatch(shiftViewAsync());
    dispatch(setView(newView));
  };
};

export default shiftView;
