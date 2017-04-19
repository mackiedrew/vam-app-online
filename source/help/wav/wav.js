// Libraries
import { decode } from "wav-decoder";
import PromiseWorker from "promise-worker";
import ObjectPromiseWorker from "promise-worker-transferable";
import GrainAmplitudeWorker from "../../workers/grainAmplitudes.worker.js";
import ReadWavWorker from "../../workers/readWav.worker.js";
// Helpers
import { logicalSegment } from "../generic/generic";

// Load configuration file
import config from "../../config.js";

/**
 * Converts seconds to samples, given a sample rate. Both have defaults so if you provide not params
 * it will simply provide a typical conversion factor. This is intentionally over-verbose.
 * @param {Number} seconds This should be pretty clear. 1/60 of a minute, 1000 milliseconds
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
export const secondsToSamples = (seconds = 1, sampleRate = 44100) =>
  seconds * sampleRate;

/**
 * Converts samples to seconds, given a sample rate. Both have defaults so if you provide not params
 * it will simply provide a typical conversion factor. This is intentionally over-verbose.
 * @param {Number} samples Number of samples for the given sample rate.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
export const samplesToSeconds = (samples = 1, sampleRate = 44100) =>
  samples / sampleRate;

/**
 * Reads and returns a promise containing the file buffer.
 * @param {File} file
 */
export const readFile = (file) => {

  const worker = new ReadWavWorker();
  const promiseWorker = new ObjectPromiseWorker(worker);
  return promiseWorker.postMessage(file);

};

/**
 * Reads and returns a promise containing the data within the wav files decoded by `wav-decoder`.
 * @param {String} filePath Absolute full path to the wav file, including filename.ext
 */
export const decodeWav = file => {
  return readFile(file).then(buffer => decode(buffer));
};

/**
 * Ugly function, but currently gathers information that is much more processed than the simple 
 * readWav() function.
 * @param {String} filePath Absolute full path to the wav file, including filename.ext
 */
export const richReadWav = (file) => {
  return readFile(file).then(({ sampleRate, channelData }) => {
    // Break out data for easy reference
    const data = channelData[0];
    const trackLength = data.length;
    // Generate grains by logically segmenting the full array of samples
    const averageGrainLength = secondsToSamples(config.grains.temp);
    const grainPoints = logicalSegment(data, averageGrainLength);
    const framesPerSample = 2000;
    const samples = grainPoints.map((grain) => {
      const grainLength = grain.end - grain.start;
      const samples = Math.ceil(grainLength / framesPerSample);
      const sampleRange = [...Array(samples).keys()];
      const collectedSamples = sampleRange.map((i) => {
        const frameNumber = grain.start + i * framesPerSample;
        const sample = Math.abs(data[frameNumber]);
        return sample;
      });
      return collectedSamples;
    });

    const worker = new GrainAmplitudeWorker();
    const promiseWorker = new PromiseWorker(worker);
    return promiseWorker
    .postMessage({ samples, grains: grainPoints, framesPerSample })
    .then((response) => {

      const { grains, maxAmplitude } = response;

      const richData = {
        sampleRate,
        trackLength,
        grains,
        maxAmplitude
      };
      return richData;
    });

  });
};
