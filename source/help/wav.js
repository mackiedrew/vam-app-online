// Libraries
import PromiseWorker from "promise-worker";
import ObjectPromiseWorker from "promise-worker-transferable";
import { decode } from "wav-decoder";

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

export const richReadWav = (url, filename, grainSize) => {
  const richDataPromise = readFile(url, filename)
    .then(({ sampleRate, channelData }) => ({
      data: channelData[0],
      sampleRate
    }))
    .then(({ data, sampleRate }) => {
      const protoGrains = createEquallySpacedGrains(data, grainSize);
      const cases = createSampleCases(protoGrains, data, 2000);
      const worker = new GrainAmplitudeWorker();
      const promiseWorker = new PromiseWorker(worker);
      return promiseWorker
        .postMessage({ cases, grains: protoGrains })
        .then(grains => {
          const result = { sampleRate, grains };
          return result;
        });
    });
  return richDataPromise;
};

export const readArrayBufferPromise = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(file);
  }).then(decode);
};

