// @flow

// Libraries
import registerPromiseWorker from "promise-worker-transferable/register";

// Helpers
import { readArrayBufferPromise } from "../help/wav";

// Register Worker
export default registerPromiseWorker(readArrayBufferPromise);
