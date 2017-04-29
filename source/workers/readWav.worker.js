import registerPromiseWorker from "promise-worker-transferable/register";
import { decode } from "wav-decoder";

registerPromiseWorker(file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(file);
  }).then(decode);
});
