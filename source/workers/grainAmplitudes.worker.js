import registerPromiseWorker from "promise-worker/register";
import { amplitudeCalculator } from "../help/grain";

// Register Promise Worker
const worker = registerPromiseWorker(amplitudeCalculator);

export default worker;
