// @flow

// Flow Types
import type { Action } from "../constants/flowTypes";

// Action Type
import { AUGMENT_A_OFF } from "../constants/actionTypes";

/**
 * Action creator: creates an action that sets Augment A to be off.
 * 
 * @returns {Object} Action: sets Augment A to be off.
 */
export const augmentAOff = (): Action => {
  return { type: AUGMENT_A_OFF };
};

export default augmentAOff;
