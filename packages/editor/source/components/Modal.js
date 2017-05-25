// @flow

// Render
import React from "react";
import "../styles/Modal.styl";

/**
 * Generic modal with contents that can be filled in later.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const Modal = ({
  title,
  text,
  noText = "Cancel",
  noCallback,
  yesText = "Confirm",
  yesCallback
}: {
  title: string,
  text: string,
  noText: string,
  noCallback: Function,
  yesText: string,
  yesCallback: Function
}) => {
  // What should actually be rendered?
  const render = (
    <div className="modal">
      <div className="dialog">
        <h2 className="title">{title}</h2>
        <p className="text">{text}</p>
        <button className="yes-button" onClick={yesCallback}>{yesText}</button>
        <button className="no-button" onClick={noCallback}>{noText}</button>
      </div>
    </div>
  );
  return render;
};

export default Modal;
