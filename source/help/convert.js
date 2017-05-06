// @flow

// Helpers
import { floor } from "./generic";

/**
 * Converts seconds to samples, given a sample rate. Both have defaults so if
 * you provide not params it will simply provide a typical conversion factor.
 * This is intentionally over-verbose.
 * 
 * @param {number} seconds This should be pretty clear. 1/60 of a minute, 1000
 * milliseconds.
 * @param {number} sampleRate Number of samples per seconds, default is 44100Hz
 * or 44.1kHz.
 */
export const secondsToSamples = (
  seconds: number = 1,
  sampleRate: number = 44100
): number => seconds * sampleRate;

/**
 * Converts samples to seconds, given a sample rate. Both have defaults so if
 * you provide not params it will simply provide a typical conversion factor.
 * This is intentionally over-verbose.
 * 
 * @param {number} samples Number of samples for the given sample rate.
 * @param {number} sampleRate Number of samples per seconds, default is 44100Hz
 * or 44.1kHz.
 */
export const samplesToSeconds = (
  samples: number = 1,
  sampleRate: number = 44100
): number => samples / sampleRate;

/**
 * Converts samples to milliseconds, given a sample rate. Both have defaults so
 * if you provide not params it will simply provide a typical conversion factor.
 * 
 * @param {number} samples Number of samples for the given sample rate.
 * @param {number} sampleRate Number of samples per seconds, default is 44100Hz
 * or 44.1kHz.
 */
export const samplesToMilliseconds = (
  samples: number = 1,
  sampleRate: number = 44100
): number => samples / sampleRate * 1000;

/**
 * Converts samples to minutes, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * 
 * @param {number} samples Number of samples for the given sample rate.
 * @param {number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz.
 */
export const samplesToMinutes = (
  samples: number = 1,
  sampleRate: number = 44100
): number => samples / sampleRate / 60;

/**
 * Converts samples to hours, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * 
 * @param {number} samples Number of samples for the given sample rate.
 * @param {number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz.
 */
export const samplesToHours = (
  samples: number = 1,
  sampleRate: number = 44100
): number => samples / sampleRate / 3600;

/**
 * Converts hours to samples, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * 
 * @param {number} hours Number of hours to convert to samples.
 * @param {number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz.
 */
export const hoursToSamples = (
  hours: number = 1,
  sampleRate: number = 44100
): number => hours * 3600 * sampleRate;

/**
 * Converts minutes to samples, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * 
 * @param {number} minutes Number of minutes to convert to samples.
 * @param {number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz.
 */
export const minutesToSamples = (
  minutes: number = 1,
  sampleRate: number = 44100
): number => minutes * 60 * sampleRate;

/**
 * Converts milliseconds to samples, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * 
 * @param {number} milliseconds Number of milliseconds to convert to samples.
 * @param {number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz.
 */
export const millisecondsToSamples = (
  milliseconds: number = 1,
  sampleRate: number = 44100
): number => milliseconds * 1000 * sampleRate;

/**
 * Converts samples to a series of keys representing hours, minutes, seconds, and milliseconds, as
 * well as a remaining number of samples.
 * 
 * @param {number} samples Number of samples for the given sample rate.
 * @param {number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz.
 * @returns {Object} Keys representing the number of time units in the time.
 */
export const samplesToTime = (
  samples: number,
  sampleRate: number = 44100
): { h: number, m: number, s: number, ms: number, samples: number } => {
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
