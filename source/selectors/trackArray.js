// Selector Framework
import { createSelector } from "reselect";

// Libraries
import { objectToArray } from "../help/generic";

// Create functions that return portions of state
const trackList = state => state.tracks.trackList;

const trackArray = createSelector([trackList], objectToArray);

export default trackArray;
