import registerPromiseWorker from "promise-worker-transferable/register";
import { readArrayBufferPromise } from "../help/fileRead";

const worker = registerPromiseWorker(readArrayBufferPromise);

export default worker;
