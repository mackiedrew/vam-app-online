// Render
import React from "react";
import "../styles/TimeBar.styl";

// Helpers
import { framesToTimeStamp } from "../help/convert";
import { range } from "../help/generic";

/**
 * Periodic, scaling, time display at the top of the tracks list.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const TimeBar = ({ view, numberOfSlices = 10 }) => {
  const { start, end } = view;
  const frameSpan = end - start;
  const sliceSize = frameSpan / numberOfSlices;
  const sliceRange = range(numberOfSlices);
  const sliceFrames = sliceRange.map(sliceNumber => sliceNumber * sliceSize);
  const timeStamps = sliceFrames.map(frame =>
    framesToTimeStamp(frame, frameSpan)
  );
  const slices = timeStamps.map((timeStamp, i) => (
    <div className="slice" key={i}>{timeStamp}</div>
  ));

  return (
    <div className="time-bar">
      {slices}
    </div>
  );
};

export default TimeBar;
