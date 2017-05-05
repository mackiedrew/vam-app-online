import { MAGNIFY_VIEW } from "../constants/actionTypes";
import setView from "./setView";

// Action Creator
const magnifyViewLabel = () => {
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
    dispatch(magnifyViewLabel());
    dispatch(setView(newView));
  };
};

export default magnifyView;
