/* eslint-disable */

import registerPromiseWorker from "promise-worker/register";
import config from "../config";

registerPromiseWorker((message) => {
  const { samples, grains, framesPerSample } = message;
  const amplitudes = grains.map((grain, i) => {
    const totaledAmplitude = samples[i].reduce((a, b) => a + b , 0);
    return totaledAmplitude / (grain.end - grain.start + 1);
  });
  const simpleGrains = grains.map((grain, index) => {
    return {
      start: grain.start,
      end: grain.end,
      amplitude: amplitudes[index]
    }
  });
  const maxAmplitude = amplitudes.reduce((a, b) => a > b ? a : b, -Infinity);
  const finalGrains = simpleGrains.map((grain) => {
    const amplitudePercentage = grain.amplitude / maxAmplitude;
    const cutoffPercentage = config.quietCutoff.value / 100;
    const quiet = amplitudePercentage <= cutoffPercentage;
    return {
      ...grain,
      quiet
    };
  })
  const result = {
    grains: finalGrains,
    maxAmplitude: maxAmplitude,
  };
  return result;
});
