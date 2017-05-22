// @flow

// Flow Types
type WavPromise = Promise<{ sampleRate: number, channelData: Array<number> }>;

// Libraries
import { decode } from "wav-decoder";

/**
 * Reads a file as an ArrayBuffer then returns a promise containing decoded
 * wav data.
 * 
 * @param {File} file File object containing a wav file.
 * @returns {Promise} Promise containing decoded wav data.
 */
export const readArrayBufferPromise = (file: File): WavPromise => {
  return new Promise(resolve => {
    // Create new file reader.
    const reader: FileReader = new FileReader();
    // What should happen when the file reader has finished loading?
    const onLoadFunction: Function = () => resolve(reader.result);
    reader.onload = onLoadFunction;
    // What function will trigger the loading?
    const readAsArrayBuffer = reader.readAsArrayBuffer;
    // Trigger the loading of the selected file.
    readAsArrayBuffer(file);
  }).then(decode);
};
