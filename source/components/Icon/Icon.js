import React from "react";
import "./Icon.styl";

/**
 * Interfaces with the Google icons font to display a standard icon.
 * @param {Object} props Including icon and size (in px) of the displayed icon. 
 */
const Icon = ({ icon, size = 24 }) => {
  const pixelSize = `${size}px`;
  // Height and width need to be set to ensure square size.
  const style = {
    width: pixelSize,
    height: pixelSize,
    fontSize: pixelSize
  };

  return (
    <i className="material-icons icon" style={style}>
      {icon}
    </i>
  );
};

export default Icon;
