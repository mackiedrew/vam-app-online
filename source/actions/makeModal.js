// @flow

// Flow Types
import type { Action, ModalTypes } from "../constants/flowTypes";

// Action Type
import { MAKE_MODAL } from "../constants/actionTypes";

/**
 * Action creator: creates an action that spawns a modal with provided data.
 * 
 * @param {string} type Type of modal.
 * @param {Object} data Any information needed for constructing the modal.
 * @returns {Object} Action: makes a modal.
 */
const makeModal = (type: ModalTypes, data: {}): Action => {
  return {
    type: MAKE_MODAL,
    payload: {
      type,
      data
    }
  };
};

export default makeModal;
