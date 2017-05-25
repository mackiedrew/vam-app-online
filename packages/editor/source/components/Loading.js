// @flow

// Render
import React from "react";
import "../styles/Loading.styl";

// Helpers
import { range } from "../help/collections";

/**
 * Loading bar for displaying before the track fully loads.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const Loading = ({ bars = 20 }: { bars?: number }) => {
  const barsRange: Array<number> = range(bars);
  const barElement: () => {} = i => <div className="bar" key={i} />;
  const barElements: Array<{}> = barsRange.map(barElement);

  return (
    <div className="loading" id="loading">
      {barElements}
    </div>
  );
};

export default Loading;
