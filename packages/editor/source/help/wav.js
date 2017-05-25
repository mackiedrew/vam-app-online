// @flow

// Flow Types
import type { numberArrayArray, numberArray } from "../constants/flowTypes";

// Libraries
import PromiseWorker from "promise-worker";
import ObjectPromiseWorker from "promise-worker-transferable";

// Helpers
import { createSampleCases, createEquallySpacedGrains } from "./grain";

// Workers
import GrainAmplitudeWorker from "../workers/grainAmplitudes.worker.js";
import ReadWavWorker from "../workers/readWav.worker.js";

/**
 * Create file from URL to be read by the file reader inside the scope of a
 * web worker.
 * 
 * @param {string} url Blob url generated from the file input dialogue.
 * @param {string} filename Name of the file read from original file input.
 * @returns {Promise} Decoded wav data from the file with provided keys of
 * channelData and sampleRate.
 */
export const readWavFromUrl = (url: string, filename: string) => {
  return fetch(url).then(response => response.blob()).then(blob => {
    const file = new File([blob], filename);
    const worker = new ReadWavWorker();
    const promiseWorker = new ObjectPromiseWorker(worker);
    return promiseWorker.postMessage(file);
  });
};

/**
 * Filters returned data from wav-decoder.decode() to just take the first
 * channel's data and sample rate.
 * 
 * @param {Object} wavData Returned from wav-decoder.decode().
 * @returns {Object} Containing keys for data and sample rate.
 */
export const processWavData = ({
  sampleRate,
  channelData
}: {
  sampleRate: number,
  channelData: numberArrayArray
}): { sampleRate: number, data: numberArray } => {
  return {
    data: channelData[0],
    sampleRate
  };
};

/**
 * Creates grains and are passed on with any still relevant data.
 * 
 * @param {Object} processedWavData Object produced from filtering wav data.
 * @param {number} grainSize How wide the equally spaced grains should be.
 * @returns {Promise} Promise returning grains with sample rate.
 */
export const createGrains = (
  processedWavData: { data: numberArray, sampleRate: number },
  grainSize: number
) => {
  const { data, sampleRate } = processedWavData;
  const protoGrains = createEquallySpacedGrains(data, grainSize);
  const cases = createSampleCases(protoGrains, data, 2000);
  const worker = new GrainAmplitudeWorker();
  const promiseWorker = new PromiseWorker(worker);

  const grainPromise = promiseWorker
    .postMessage({ cases, grains: protoGrains })
    .then(grains => ({ sampleRate, grains }));

  return grainPromise;
};

/**
 * The old, monolithic function that should almost certainly be removed
 * eventually. This whole file is a trash heap.
 * 
 * @param {string} url URL to blob or resource for wav decoding.
 * @param {string} filename Original or fabricated filename for file creation.
 * @param {number} grainSize How long a grain should be. (Temporary).
 * @returns {Promise} A promise containing required wav data for constructing
 * a track.
 */
export const richReadWav = (
  url: string,
  filename: string,
  grainSize: number
) => {
  const richDataPromise = readWavFromUrl(url, filename)
    .then(processWavData)
    .then(processedWavData => createGrains(processedWavData, grainSize));
  return richDataPromise;
};
