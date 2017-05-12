// Libraries
import PromiseWorker from "promise-worker";
import ObjectPromiseWorker from "promise-worker-transferable";

// Helpers
import { createSampleCases, createEquallySpacedGrains } from "./grain";

// Workers
import GrainAmplitudeWorker from "../workers/grainAmplitudes.worker.js";
import ReadWavWorker from "../workers/readWav.worker.js";

export const readFile = (url, filename) => {
  return fetch(url).then(response => response.blob()).then(blob => {
    const file = new File([blob], filename);
    const worker = new ReadWavWorker();
    const promiseWorker = new ObjectPromiseWorker(worker);
    return promiseWorker.postMessage(file);
  });
};

export const processWavData = ({ sampleRate, channelData }) => {
  return {
    data: channelData[0],
    sampleRate
  };
};

export const createGrains = (processedWavData, grainSize) => {
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

export const richReadWav = (url, filename, grainSize) => {
  const richDataPromise = readFile(url, filename)
    .then(processWavData)
    .then(processedWavData => createGrains(processedWavData, grainSize));
  return richDataPromise;
};
