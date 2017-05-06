// Render
import React from "react";
import "../styles/Loading.styl";

// Libraries
import { range } from "../help/generic";

/**
 * Loading bar for displaying before the track fully loads.
 * 
 * @param {Object} props Single key: `bars` which indicates how many bars there are in the loader.
 */
const Loading = ({ bars = 20 }) => {
  const barsRange = range(bars);
  const barElement = i => <div className="bar" key={i} />;
  const barElements = barsRange.map(barElement);

  return (
    <div className="loading" id="loading">
      {barElements}
    </div>
  );
};

export default Loading;
