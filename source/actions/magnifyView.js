import { MAGNIFY_VIEW } from "../constants/actionTypes";
import setView from "./setView";

// Action Creator
const magnifyViewAsync = () => {
  return { type: MAGNIFY_VIEW };
};

// Thunk
const magnifyView = magnificationFactor => {
  return (dispatch, getState) => {
    const { view } = getState().tracks;
    const newEnd = Math.ceil(view.end * magnificationFactor);
    const newView = {
      ...view,
      end: newEnd
    };
    dispatch(magnifyViewAsync());
    dispatch(setView(newView));
  };
};

export default magnifyView;
