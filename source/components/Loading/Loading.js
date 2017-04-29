import React from "react";
import "./Loading.styl";

import { range } from "../../help/generic/generic";

const bars = 20;

const Loading = () => (
  <div className="loading" id="loading">
    {range(bars).map(i => <div className="bar" key={i} />)}
  </div>
);

export default Loading;
