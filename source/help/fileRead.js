import { decode } from "wav-decoder";

export const readArrayBufferPromise = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(file);
  }).then(decode);
};
