// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { AUGMENT_A_ON } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets Augment A to be on.
 * 
 * @returns {Object} Action: sets Augment A to be on.
 */
export const augmentAOn = (): Action => {
  return { type: AUGMENT_A_ON };
};

export default augmentAOn;
