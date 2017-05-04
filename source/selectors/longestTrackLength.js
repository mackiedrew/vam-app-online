// Selector Framework
import { createSelector } from "reselect";

// Libraries
import { max, objectToArray } from "../help/generic";

// Other Selector
import trackLengths from "./trackLengths";

const longestTrackLength = createSelector(trackLengths, lengths => {
  const lengthArray = objectToArray(lengths);
  const longest = max(lengthArray);
  return longest;
});

export default longestTrackLength;
