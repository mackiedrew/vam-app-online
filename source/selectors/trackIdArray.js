// Selector Framework
import { createSelector } from "reselect";

// Create functions that return portions of state
const trackList = state => state.tracks.trackList;

const trackIdArray = createSelector(trackList, Object.keys);

export default trackIdArray;
