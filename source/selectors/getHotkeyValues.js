// @flow

// Libraries
import { createSelector } from "reselect";

// State Filter
const getHotkeys = state => state.keyboard.hotkeys;

/**
 * Create a simplified state object that contains only hotkeys names as keys
 * and their current respective `values` as  the object values. Rather than
 * containing the more complex information about units, labels, etc.
 * 
 * @param {Object} hotkeys Config-style hotkey object with operations keying.
 * @returns {Object} Longest track length as a number.
 */
const getHotkeyValuesCore = (hotkeys: Object): Object => {
  // What are the operational names of all the hotkeys?
  const hotkeyNames: Array<string> = Object.keys(hotkeys);
  // What is the current button value of each of these hotkeys?
  const hotkeyValues: Array<string> = hotkeyNames.map(n => hotkeys[n].value);
  // How do we have `key`: `value` equal `hotkeyName`: `hotkeyValue`?
  const hotkeyValuesObject: Object = hotkeyNames.reduce(
    (accumulator: Object, name: string, i: number): Object => ({
      ...accumulator,
      [name]: hotkeyValues[i]
    }),
    {}
  );
  return hotkeyValuesObject;
};

// Selector Construction
const getHotkeyValues = createSelector(getHotkeys, getHotkeyValuesCore);

export default getHotkeyValues;
