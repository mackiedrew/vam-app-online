/* eslint-disable */

import registerPromiseWorker from "promise-worker/register";


registerPromiseWorker(({ samples, grains, framesPerSample }) => {
  const amplitudes = grains.map((grain, i) => {
    const totaledAmplitude = samples[i].reduce((a, b) => a + b , 0);
    return totaledAmplitude / (grain.end - grain.start);
  });
  const finalGrains = grains.map((grain, index) => {
    return {
      start: grain.start,
      end: grain.end,
      amplitude: amplitudes[index]
    }
  });
  const maxAmplitude = amplitudes.reduce((a, b) => a > b ? a : b, -Infinity);
  return { grains: finalGrains, maxAmplitude};
});
