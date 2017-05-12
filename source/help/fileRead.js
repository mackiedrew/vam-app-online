// @flow

// Flow Types
type WavPromise = Promise<{ sampleRate: number, channelData: Array<any> }>;

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
    const reader: FileReader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(file);
  }).then(decode);
};
