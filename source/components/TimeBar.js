// @flow

// Render
import React from "react";
import "../styles/TimeBar.styl";

// Helpers
import { framesToTimeStamp } from "../help/convert";
import { range } from "../help/generic";
import { floor } from "../help/math";

// Types
import type { viewType } from "../constants/flowTypes";

/**
 * Periodic, scaling, time display at the top of the tracks list.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const TimeBar = ({
  view,
  numberOfSlices = 10
}: {
  view: viewType,
  numberOfSlices: number
}) => {
  // Break out values
  const { start, end }: { start: number, end: number } = view;
  // How many frames does the total view represent?
  const frameSpan: number = end - start;
  // How many frames does each slice represent?
  const sliceSize: number = floor(frameSpan / numberOfSlices);
  // How can we iterate over the number of slices with a map?
  const sliceRange: Array<number> = range(numberOfSlices);
  // How many frames cumulatively represented at each slice start?
  const sliceFrames: Array<number> = sliceRange.map(i => i * sliceSize);
  // How far into the track is each slice when added pre-view frames?
  const absoluteSliceFrames: Array<number> = sliceFrames.map(f => f + start);
  // What HH:MM:SS:MiS time stamps represent the number of frames per slice?
  const timeStamps: Array<string> = absoluteSliceFrames.map(f =>
    framesToTimeStamp(f, frameSpan)
  );
  // Generate slices for display
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
