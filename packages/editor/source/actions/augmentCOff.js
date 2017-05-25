// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { AUGMENT_C_OFF } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets Augment C to be off.
 * 
 * @returns {Object} Action: sets Augment C to be off.
 */
export const augmentCOff = (): Action => {
  return { type: AUGMENT_C_OFF };
};

export default augmentCOff;
