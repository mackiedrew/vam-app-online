/* eslint-disable */

import registerPromiseWorker from "promise-worker/register";
import { mean, zipObjectArray, max } from "../help/generic/generic";
import config from "../config";

registerPromiseWorker(({ grains, cases }) => {
  
  const amplitudes = cases.map(mean);
  console.log(amplitudes)
  const maxAmplitude = max(amplitudes);
  console.log(maxAmplitude)

  const simpleGrains = zipObjectArray(grains, "amplitude", amplitudes); 

  const isQuiet = simpleGrains.map((grain) => {
    const amplitudePercentage = grain.amplitude / maxAmplitude;
    const cutoffPercentage = config.quietCutoff.value / 100;
    const quiet = amplitudePercentage <= cutoffPercentage;
    return quiet;
  })

  const finalGrains = zipObjectArray(simpleGrains, "quiet", isQuiet); 

  const result = {
    grains: finalGrains,
    maxAmplitude: maxAmplitude,
  };
  return result;
});
