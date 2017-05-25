// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { AUGMENT_C_ON } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets Augment C to be on.
 * 
 * @returns {Object} Action: sets Augment C to be on.
 */
export const augmentCOn = (): Action => {
  return { type: AUGMENT_C_ON };
};

export default augmentCOn;
