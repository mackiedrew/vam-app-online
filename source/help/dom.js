// @flow

/**
 * Reset the file contents through this silly hack. It's illegal to change file
 * input manually for any reason, so I set the type to a changeable type, reset
 * the value, then change it back.
 * 
 * @param {HTMLInputElement} inputTag Input tag, typically retrieved through
 * getElementById().
 * @returns {undefined} Does not return anything.
 */
export const clearFileInput = (inputTag: HTMLInputElement): void => {
  inputTag.type = "";
  inputTag.value = "";
  inputTag.type = "file";
};

/**
 * Simple wrapper of document.getElementById.
 * 
 * @param {string} id Id of element you want to get.
 * @returns {HTMLElement} HTML element matching the provided ID.
 */
export const getElementById = (id: string): HTMLElement | null =>
  document.getElementById(id);

/**
 * Simple function to allow easy mapping of an array for element.play().
 * 
 * @param {HTMLAudioElement} element Audio tag.
 * @returns {undefined} Does not return anything.
 */
export const playElement = (element: HTMLAudioElement): void => element.play();

/**
 * Simple function to allow easy mapping of an array for element.pause().
 * 
 * @param {HTMLAudioElement} element Audio tag.
 * @returns {undefined} Does not return anything.
 */
export const pauseElement = (element: HTMLAudioElement): void =>
  element.pause();

/**
 * Simple function to allow easy mapping of an array for setting the time.
 * 
 * @param {HTMLAudioElement} element Audio tag.
 * @param {number} time Time in seconds that the current time of the provided
 * element should be.
 * @returns {undefined} Does not return anything.
 */
export const setElementCurrentTime = (
  element: HTMLAudioElement,
  time: number
): void => {
  element.currentTime = time;
};
