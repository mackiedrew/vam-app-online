// @flow

// Flow Types
import type { ReactChildren } from "../constants/flowTypes";

// Render
import React from "react";

/**
 * A button that switches content and function based on the current state.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const ToggleButton = ({
  on = false,
  onContents,
  offContents,
  onFunction,
  offFunction
}: {
  on: boolean,
  onContents: ReactChildren,
  offContents: ReactChildren,
  onFunction: Function,
  offFunction: Function
}) => {
  const onClick: Function = on ? onFunction : offFunction;
  const contents: ReactChildren = on ? onContents : offContents;

  return (
    <button className="toggle-button" onClick={onClick}>
      {contents}
    </button>
  );
};

export default ToggleButton;
