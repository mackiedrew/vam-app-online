/**
 * Reset the file contents through this silly hack. It's illegal to change file input manually for
 * any reason, so I set the type to a changeable type, reset the value, then change it back.
 * @param {HTMLInputElement} inputTag Input tag, typically retrieved through getElementById().
 * @returns {null} This does not return anything.
 */
export const clearFileInput = inputTag => {
  inputTag.type = "";
  inputTag.value = "";
  inputTag.type = "file";
};
