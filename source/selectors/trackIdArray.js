// @flow

// Flow Types
import type { State } from "../constants/flowTypes";

// Libraries
import { createSelector } from "reselect";

// State Filter
const trackList = (state: State): {} => state.tracks.trackList;

// Selector Constructor
const trackIdArray: Function = createSelector(trackList, Object.keys);

export default trackIdArray;
