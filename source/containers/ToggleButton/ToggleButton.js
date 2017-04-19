import React from "react";
import "./ToggleButton.styl";

const ToggleButton = ({ on, onContents, offContents, onFunction, offFunction }) => {

  const onClick = on ? onFunction : offFunction;
  const contents = on ? onContents : offContents;

  return (
    <button onClick={onClick} >
      { contents }
    </button>
  );
};


export default ToggleButton;
