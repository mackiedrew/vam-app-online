// @flow

// Flow Types
import type { Action, ThunkAction, Dispatch } from "../constants/flowTypes";

// Action Type
import { RESUME_CONTROLS } from "../constants/actionTypes";

// Libraries
import keyboard from "keyboardjs";

/**
 * Action creator: resumes hotkey controls until otherwise de-activated.
 * 
 * @returns {Object} Action: resumes hotkey controls.
 */
export const resumeControlsSimple = (): Action => {
  return { type: RESUME_CONTROLS };
};

/**
 * Thunk: pauses hotkey controls until otherwise de-activated.
 * 
 * @returns {Function} Action creator that plays hotkey controls until
 * otherwise de-activated.
 */
const resumeControls = (): ThunkAction => {
  return (dispatch: Dispatch): void => {
    keyboard.resume();
    dispatch(resumeControlsSimple());
  };
};

export default resumeControls;
