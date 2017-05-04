import React from "react";
import "../styles/TimeBar.styl";

import { samplesToTime, samplesToSeconds } from "../help/convert";
import { range, leadingZeros } from "../help/generic";

export const Slice = ({ sample, sampleSpan }) => {
  const { h, m, s, ms } = samplesToTime(sample);
  const H = leadingZeros(h, 2);
  const M = leadingZeros(m, 2);
  const S = leadingZeros(s, 2);
  const MS = leadingZeros(ms, 3);

  const timesToShow = [];

  const secondsSpan = samplesToSeconds(sampleSpan);

  if (secondsSpan < 60) {
    timesToShow.push(MS);
  }

  timesToShow.push(S);

  if (secondsSpan >= 60) {
    timesToShow.push(M);
  }

  if (secondsSpan >= 3600) {
    timesToShow.push(H);
  }

  const timeStamp = timesToShow.reverse().join(":");

  return (
    <div className="slice">
      {timeStamp}
    </div>
  );
};

const TimeBar = ({ view }) => {
  const numberOfSlices = 10;
  const { start, end } = view;
  const sampleSpan = end - start;
  const sliceSize = sampleSpan / numberOfSlices;
  const sliceRange = range(numberOfSlices);
  const sliceSamples = sliceRange.map(sliceNumber => sliceNumber * sliceSize);

  return (
    <div className="time-bar">
      {sliceSamples.map((sample, i) => (
        <Slice key={i} sample={sample} sampleSpan={sampleSpan} />
      ))}
    </div>
  );
};

export default TimeBar;
