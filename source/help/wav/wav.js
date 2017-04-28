/* eslint-env node */

// Libraries
import PromiseWorker from "promise-worker";
import ObjectPromiseWorker from "promise-worker-transferable";
import GrainAmplitudeWorker from "../../workers/grainAmplitudes.worker.js";
import ReadWavWorker from "../../workers/readWav.worker.js";

// Helpers
import { logicalSegment, floor } from "../generic/generic";

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

export const samplesToMilliseconds = (samples = 1, sampleRate = 44100) =>
  samples / sampleRate * 1000;

export const samplesToMinutes = (samples = 1, sampleRate = 44100) =>
  samples / sampleRate / 60;

export const samplesToHours = (samples = 1, sampleRate = 44100) =>
  samples / sampleRate / 3600;

export const hoursToSamples = (hours = 1, sampleRate = 44100) =>
  hours * 3600 * sampleRate;

export const minutesToSamples = (minutes = 1, sampleRate = 44100) =>
  minutes * 60 * sampleRate;

export const millisecondsToSamples = (milliseconds = 1, sampleRate = 44100) =>
  milliseconds * 1000 * sampleRate;

export const samplesToTime = (samples, sampleRate = 44100) => {
  let remainingSamples = samples;

  const h = floor(samplesToHours(remainingSamples, sampleRate));
  remainingSamples -= hoursToSamples(h, sampleRate);

  const m = floor(samplesToMinutes(remainingSamples, sampleRate));
  remainingSamples -= minutesToSamples(m, sampleRate);

  const s = floor(samplesToSeconds(remainingSamples, sampleRate));
  remainingSamples -= secondsToSamples(s, sampleRate);

  const ms = floor(samplesToMilliseconds(remainingSamples, sampleRate));
  remainingSamples -= millisecondsToSamples(s, sampleRate);

  return { h, m, s, ms };
};

/**
 * Reads and returns a promise containing the file buffer.
 * @param {File} file
 */
export const readFile = file => {
  const worker = new ReadWavWorker();
  const promiseWorker = new ObjectPromiseWorker(worker);
  return promiseWorker.postMessage(file);
};

/**
 * Ugly function, but currently gathers information that is much more processed than the simple 
 * readWav() function.
 * @param {String} filePath Absolute full path to the wav file, including filename.ext
 */
export const richReadWav = file => {
  return readFile(file).then(({ sampleRate, channelData }) => {
    // Break out data for easy reference
    const data = channelData[0];
    const trackLength = data.length;
    // Generate grains by logically segmenting the full array of samples
    const averageGrainLength = secondsToSamples(config.grain.value);
    const grainPoints = logicalSegment(data, averageGrainLength);
    const framesPerSample = 2000;
    const samples = grainPoints.map(grain => {
      const grainLength = grain.end - grain.start;
      const samples = Math.ceil(grainLength / framesPerSample);
      const sampleRange = [...Array(samples).keys()];
      const collectedSamples = sampleRange.map(i => {
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
      .then(response => {
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
