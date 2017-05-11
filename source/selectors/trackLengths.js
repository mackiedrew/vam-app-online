// Libraries
import { createSelector } from "reselect";

// Helpers
import { objectToArray } from "../help/generic";

// Create functions that return portions of state
const trackList = state => state.tracks.trackList;

const trackLengths = createSelector(trackList, list => {
  const trackArray = objectToArray(list);
  const grainsList = trackArray.map(track => track.grains);
  const numberOfGrains = grainsList.map(grains => grains.length);
  const finalGrainIndexes = numberOfGrains.map(x => x - 1);
  const finalGrains = finalGrainIndexes.map((i, t) => trackArray[t].grains[i]);
  const lastFrames = finalGrains.map(grain => grain.end);
  const trackIds = Object.keys(list);
  const lastFramesWithIds = trackIds.reduce(
    (accumulator, id, i) => ({ ...accumulator, [id]: lastFrames[i] }),
    {}
  );
  return lastFramesWithIds;
});

export default trackLengths;
