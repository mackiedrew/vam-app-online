import { decode } from "wav-decoder";

/**
 * Wrapper for the wav-decoder library, just to have one point of import.
 * 
 * @param {ArrayBuffer} arrayBuffer Containing an array buffer from a stream or file.
 * @returns {Object} Decoded wav containing channelData and sampleRate.
 */
export const decodeWav = arrayBuffer => decode(arrayBuffer);

export const readArrayBufferPromise = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(file);
  }).then(decodeWav);
};
