// @flow

// Render
import React from "react";
import "../styles/Filters.styl";

/**
 * Shows a list of available filters and allows for selection.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const Filters = ({ open }: { open: boolean | void }) => {
  const style: { marginLeft: string } = open
    ? { marginLeft: "0px" }
    : { marginLeft: "-100px" };
  return (
    <aside className="filters" style={style}>
      Filter!
    </aside>
  );
};

export default Filters;
