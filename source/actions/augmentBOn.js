// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { AUGMENT_B_ON } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets Augment B to be on.
 * 
 * @returns {Object} Action: sets Augment B to be on.
 */
export const augmentBOn = (): Action => {
  return { type: AUGMENT_B_ON };
};

export default augmentBOn;
