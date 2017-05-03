import registerPromiseWorker from "promise-worker/register";
import { mean, zipObjectArray, max } from "../help/generic/generic";
import { areGrainsQuiet } from "../help/grain/grain";

registerPromiseWorker(({ protoGrains, quietCutoff, cases }) => {
  // Add amplitudes to grains
  const amplitudes = cases.map(mean);
  const simpleGrains = zipObjectArray(protoGrains, "amplitude", amplitudes);

  // Add quietness to grains
  const quietnessCutoff = quietCutoff / 100;
  const quietGrains = areGrainsQuiet(simpleGrains, quietnessCutoff);
  const finalGrains = zipObjectArray(simpleGrains, "quiet", quietGrains);

  // Calculate max amplitude
  const maxAmplitude = max(amplitudes);

  const result = { grains: finalGrains, maxAmplitude: maxAmplitude };
  return result;
});
