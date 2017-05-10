// Libraries
import { createSelector } from "reselect";

// Helpers
import { objectToArray } from "../help/generic";
import { max } from "../help/math";

// Other Selector
import trackLengths from "./trackLengths";

const longestTrackLength = createSelector(trackLengths, lengths => {
  const lengthArray = objectToArray(lengths);
  const longest = max(lengthArray);
  return longest;
});

export default longestTrackLength;
