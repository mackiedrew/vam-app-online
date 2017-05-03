import React from "react";
import "./Filters.styl";

export const filtersStyle = open => {
  return open ? { marginLeft: "0px" } : { marginLeft: "-100px" };
};

const Filters = props => {
  return (
    <aside className="filters" style={filtersStyle(props.open)}>
      Filter!
    </aside>
  );
};

export default Filters;
