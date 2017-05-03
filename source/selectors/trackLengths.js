// Selector Framework
import { createSelector } from "reselect";

// Libraries
import objectToArray from "../help/generic/generic";

// Create functions that return portions of state
const trackList = state => state.trackList;

const trackLengths = createSelector(trackList, list => {
  const trackArray = objectToArray(list);
  const grainsList = trackArray.map(track => track.grains);
  const numberOfGrains = grainsList.map(grains => grains.length);
  const finalGrainIndexes = numberOfGrains.map(x => x - 1);
  const finalGrains = finalGrainIndexes.map((i, t) => trackList[t].grains[i]);
  const lastFrames = finalGrains(grain => grain.end);
  const trackIds = Object.keys(trackList);
  const lastFramesWithIds = trackIds.map((id, i) => ({ [id]: lastFrames[i] }));
  return lastFramesWithIds;
});

export default trackLengths;
