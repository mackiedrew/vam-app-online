// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { AUGMENT_B_OFF } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets Augment B to be off.
 * 
 * @returns {Object} Action: sets Augment B to be off.
 */
export const augmentBOff = (): Action => {
  return { type: AUGMENT_B_OFF };
};

export default augmentBOff;
