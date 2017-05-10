// @flow

// Libraries
import registerPromiseWorker from "promise-worker/register";

// Helpers
import { amplitudeCalculator } from "../help/grain";

// Register Worker
export default registerPromiseWorker(amplitudeCalculator);
