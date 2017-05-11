// Libraries
import { createSelector } from "reselect";

// State Filter
const trackList = state => state.tracks.trackList;

// Selector Constructor
const trackIdArray = createSelector(trackList, Object.keys);

export default trackIdArray;
