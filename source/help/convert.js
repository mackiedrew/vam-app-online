import { floor } from "./generic";

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
 * Converts samples to milliseconds, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} samples Number of samples for the given sample rate.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
export const samplesToMilliseconds = (samples = 1, sampleRate = 44100) =>
  samples / sampleRate * 1000;

/**
 * Converts samples to minutes, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} samples Number of samples for the given sample rate.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
export const samplesToMinutes = (samples = 1, sampleRate = 44100) =>
  samples / sampleRate / 60;

/**
 * Converts samples to hours, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} samples Number of samples for the given sample rate.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
export const samplesToHours = (samples = 1, sampleRate = 44100) =>
  samples / sampleRate / 3600;

/**
 * Converts hours to samples, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} hours Number of hours to convert to samples.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
export const hoursToSamples = (hours = 1, sampleRate = 44100) =>
  hours * 3600 * sampleRate;

/**
 * Converts minutes to samples, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} minutes Number of minutes to convert to samples.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
export const minutesToSamples = (minutes = 1, sampleRate = 44100) =>
  minutes * 60 * sampleRate;

/**
 * Converts milliseconds to samples, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} milliseconds Number of milliseconds to convert to samples.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
export const millisecondsToSamples = (milliseconds = 1, sampleRate = 44100) =>
  milliseconds * 1000 * sampleRate;

/**
 * Converts samples to a series of keys representing hours, minutes, seconds, and milliseconds, as
 * well as a remaining number of samples.
 * @param {Number} samples Number of samples for the given sample rate.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 * @return {Object} keys representing the number of time units in the time.
 */
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

  return { h, m, s, ms, samples: remainingSamples };
};
