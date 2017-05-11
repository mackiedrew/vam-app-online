// @flow

// Flow Types
import type { stringArray, numberArray } from "../constants/flowTypes";

// Helpers
import { leadingZeros } from "./generic";
import { reverse } from "./immutable";
import { floor } from "./math";

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
 * Converts frames (or samples) to a series of keys representing hours, minutes,
 * seconds, and milliseconds, as well as a remaining number of samples.
 * 
 * @param {number} frames Number of frames for the given sample rate.
 * @param {number} sampleRate Number of samples per seconds, default is 44100Hz
 * or 44.1kHz.
 * @returns {Object} Keys representing the number of time units in the time.
 */
export const framesToTime = (
  frames: number,
  sampleRate: number = 44100
): { h: number, m: number, s: number, ms: number, frames: number } => {
  const convertSeconds = [
    60 ** 2, // h
    60 ** 1, // m
    60 ** 0, // s
    1 / 1000 // ms
  ];
  const convertFrames = convertSeconds.map(x => x * sampleRate);
  const conversions: {
    remainingFrames: number,
    result: numberArray
  } = convertFrames.reduce(
    (accumulator, convertFrame) => {
      const { remainingFrames } = accumulator;
      const newValue: number = floor(remainingFrames / convertFrame);
      const newValueInFrames: number = newValue * convertFrame;
      const newFrames: number = remainingFrames - newValueInFrames;

      return {
        remainingFrames: newFrames,
        result: [...accumulator.result, newValue]
      };
    },
    { remainingFrames: frames, result: [] }
  );
  const timeSegments = {
    h: conversions.result[0],
    m: conversions.result[1],
    s: conversions.result[2],
    ms: conversions.result[3],
    frames: conversions.remainingFrames
  };
  return timeSegments;
};

/**
 * Converts a frame number into a reasonably granular number of digits. Which 
 * should equal 2 time segments by default.
 * 
 * @param {number} frame The current audio frame (sample) for display.
 * @param {number} frameSpan The total span of frames that is currently
 * displayed within the current view. Used to determine granularity.
 * @returns {string} Timestamp with a reasonable amount of granularity.
 */
export const framesToTimeStamp = (frame: number, frameSpan: number): string => {
  // Construct time segments
  const { h, m, s, ms } = framesToTime(frame);
  const H: string = leadingZeros(h, 2);
  const M: string = leadingZeros(m, 2);
  const S: string = leadingZeros(s, 2);
  const MS: string = leadingZeros(ms, 3);
  const timeSegments: Array<string> = [MS, `${S}s`, `${M}m`, `${H}h`];

  // Figure out which time segments should be included.
  const secondsSpan: number = samplesToSeconds(frameSpan);
  const segmentCutoffs: Array<number> = [60, 60 ** 2, Infinity, Infinity];
  const segmentThresholdPassing = segmentCutoffs.filter(
    segment => secondsSpan >= segment
  );
  const startIndex: number = segmentThresholdPassing.length;
  const timesToShow = timeSegments.slice(startIndex, startIndex + 2);

  // Construct final string.
  const reversedTimesToShow: stringArray = reverse(timesToShow);
  const timeStamp = reversedTimesToShow.join(":");
  return timeStamp;
};
