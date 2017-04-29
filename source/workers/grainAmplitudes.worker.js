/* eslint-disable */

import registerPromiseWorker from "promise-worker/register";
import { mean, zipObjectArray, max } from "../help/generic/generic";
import { areGrainsQuiet } from "../help/grain/grain";
import config from "../config";

registerPromiseWorker(({ protoGrains, cases }) => {
  
  // Add amplitudes to grains
  const amplitudes = cases.map(mean);
  const simpleGrains = zipObjectArray(protoGrains, "amplitude", amplitudes);

  // Add quietness to grains
  const quietnessCutoff =  config.quietCutoff.value / 100
  const quietGrains = areGrainsQuiet(simpleGrains, quietnessCutoff);
  const finalGrains = zipObjectArray(simpleGrains, "quiet", quietGrains); 

  // Calculate max amplitude
  const maxAmplitude = max(amplitudes);

  const result = { grains: finalGrains, maxAmplitude: maxAmplitude };
  return result;
});
