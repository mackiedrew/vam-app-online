// @flow

// Libraries
import registerPromiseWorker from "promise-worker-transferable/register";

// Helpers
import { readArrayBufferPromise } from "../help/fileRead";

// Register Worker
export default registerPromiseWorker(readArrayBufferPromise);
