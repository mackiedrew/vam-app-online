// @flow

// Render
import React from "react";
import "../styles/Icon.styl";

/**
 * Loads Google Icons-font to display a standard icon.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const Icon = ({ icon, size = 24 }: { icon: string, size?: number }) => {
  const pixelSize: string = `${size}px`;
  // Height and width need to be set to ensure square size.
  const style: { width: string, height: string, fontSize: string } = {
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
