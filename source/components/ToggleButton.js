// @flow

// Render
import React from "react";

/**
 * A button that switches content and function based on the current state.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const ToggleButton = ({
  on,
  onContents,
  offContents,
  onFunction,
  offFunction
}: {
  on: boolean | void,
  onContents: any,
  offContents: any,
  onFunction: () => {},
  offFunction: () => {}
}) => {
  const onClick = on ? onFunction : offFunction;
  const contents = on ? onContents : offContents;

  return (
    <button className="toggle-button" onClick={onClick}>
      {contents}
    </button>
  );
};

export default ToggleButton;
