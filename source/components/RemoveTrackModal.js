// @flow

// Flow Types
import type {} from "../constants/flowTypes";

// Render
import React from "react";

// Components
import Modal from "../components/Modal";

/**
 * Creates modal for removing a specific track.
 * 
 * @param {Object} props React props.
 * @returns {Object} React element.
 */
const RemoveTrackModal = ({
  fileName,
  removeTrack,
  clearModal
}: {
  fileName: string,
  removeTrack: Function,
  clearModal: Function
}) => {
  // What title should the user see?
  const title: string = `Are you sure you want to remove ${fileName}?`;

  return (
    <Modal
      noCallback={clearModal}
      noText="No"
      text="Once it is removed it cannot be undone."
      title={title}
      yesCallback={removeTrack}
      yesText="Yes"
    />
  );
};

export default RemoveTrackModal;
