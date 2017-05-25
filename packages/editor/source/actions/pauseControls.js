// @flow

// Flow Types
import type { Action, ThunkAction, Dispatch } from "../constants/flowTypes";

// Action Type
import { PAUSE_CONTROLS } from "../constants/actionTypes";

// Libraries
import keyboard from "keyboardjs";

/**
 * Action creator: pauses hotkey controls until otherwise re-activated.
 * 
 * @returns {Object} Action: pauses hotkey controls.
 */
export const pauseControlsSimple = (): Action => {
  return { type: PAUSE_CONTROLS };
};

/**
 * Thunk: pauses hotkey controls until otherwise re-activated.
 * 
 * @returns {Function} Action creator that pauses hotkey controls until
 * otherwise re-activated.
 */
const pauseControls = (): ThunkAction => {
  return (dispatch: Dispatch): void => {
    keyboard.pause();
    dispatch(pauseControlsSimple());
  };
};

export default pauseControls;
