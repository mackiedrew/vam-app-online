import React from "react";
import "../styles/Filters.styl";

export const filtersStyle = open => {
  return open ? { marginLeft: "0px" } : { marginLeft: "-100px" };
};

const Filters = ({ open }) => {
  const style = filtersStyle(open);

  return (
    <aside className="filters" style={style}>
      Filter!
    </aside>
  );
};

export default Filters;
