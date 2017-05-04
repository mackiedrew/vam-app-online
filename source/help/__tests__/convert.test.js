import {
  samplesToMilliseconds,
  samplesToSeconds,
  samplesToMinutes,
  samplesToHours,
  millisecondsToSamples,
  secondsToSamples,
  minutesToSamples,
  hoursToSamples,
  samplesToTime
} from "../convert.js";

const testSamples = 44100 * 3;
const testSampleRate = 500;

describe("samplesToMilliseconds()", () => {
  const subjectFunction = samplesToMilliseconds;
  it("returns a number greater than 0", () => {
    const defaultResult = subjectFunction();
    const partialResult = subjectFunction(testSamples);
    const result = subjectFunction(testSamples, testSampleRate);
    expect(defaultResult).toBeGreaterThan(0);
    expect(partialResult).toBeGreaterThan(0);
    expect(result).toBeGreaterThan(0);
  });
});

describe("samplesToSeconds()", () => {
  const subjectFunction = samplesToSeconds;
  it("returns a number greater than 0", () => {
    const defaultResult = subjectFunction();
    const partialResult = subjectFunction(testSamples);
    const result = subjectFunction(testSamples, testSampleRate);
    expect(defaultResult).toBeGreaterThan(0);
    expect(partialResult).toBeGreaterThan(0);
    expect(result).toBeGreaterThan(0);
  });
});

describe("samplesToMinutes()", () => {
  const subjectFunction = samplesToMinutes;
  it("returns a number greater than 0", () => {
    const defaultResult = subjectFunction();
    const partialResult = subjectFunction(testSamples);
    const result = subjectFunction(testSamples, testSampleRate);
    expect(defaultResult).toBeGreaterThan(0);
    expect(partialResult).toBeGreaterThan(0);
    expect(result).toBeGreaterThan(0);
  });
});

describe("samplesToHours()", () => {
  const subjectFunction = samplesToHours;
  it("returns a number greater than 0", () => {
    const defaultResult = subjectFunction();
    const partialResult = subjectFunction(testSamples);
    const result = subjectFunction(testSamples, testSampleRate);
    expect(defaultResult).toBeGreaterThan(0);
    expect(partialResult).toBeGreaterThan(0);
    expect(result).toBeGreaterThan(0);
  });
});

describe("millisecondsToSamples()", () => {
  const subjectFunction = millisecondsToSamples;
  it("returns a number greater than 0", () => {
    const defaultResult = subjectFunction();
    const partialResult = subjectFunction(testSamples);
    const result = subjectFunction(testSamples, testSampleRate);
    expect(defaultResult).toBeGreaterThan(0);
    expect(partialResult).toBeGreaterThan(0);
    expect(result).toBeGreaterThan(0);
  });
});

describe("secondsToSamples()", () => {
  const subjectFunction = secondsToSamples;
  it("returns a number greater than 0", () => {
    const defaultResult = subjectFunction();
    const partialResult = subjectFunction(testSamples);
    const result = subjectFunction(testSamples, testSampleRate);
    expect(defaultResult).toBeGreaterThan(0);
    expect(partialResult).toBeGreaterThan(0);
    expect(result).toBeGreaterThan(0);
  });
});

describe("minutesToSamples()", () => {
  const subjectFunction = minutesToSamples;
  it("returns a number greater than 0", () => {
    const defaultResult = subjectFunction();
    const partialResult = subjectFunction(testSamples);
    const result = subjectFunction(testSamples, testSampleRate);
    expect(defaultResult).toBeGreaterThan(0);
    expect(partialResult).toBeGreaterThan(0);
    expect(result).toBeGreaterThan(0);
  });
});

describe("hoursToSamples()", () => {
  const subjectFunction = hoursToSamples;
  it("returns a number greater than 0", () => {
    const defaultResult = subjectFunction();
    const partialResult = subjectFunction(testSamples);
    const result = subjectFunction(testSamples, testSampleRate);
    expect(defaultResult).toBeGreaterThan(0);
    expect(partialResult).toBeGreaterThan(0);
    expect(result).toBeGreaterThan(0);
  });
});

describe("samplesToTime()", () => {
  const timeSampleTest = 2 * 60 * 60 * 44100 + 30;
  it("returns object with all required keys without sampleRate", () => {
    const result = samplesToTime(timeSampleTest);
    expect("h" in result).toBe(true);
    expect("m" in result).toBe(true);
    expect("s" in result).toBe(true);
    expect("ms" in result).toBe(true);
    expect("samples" in result).toBe(true);
  });

  it("returns object with all required keys", () => {
    const result = samplesToTime(timeSampleTest, testSampleRate);
    expect("h" in result).toBe(true);
    expect("m" in result).toBe(true);
    expect("s" in result).toBe(true);
    expect("ms" in result).toBe(true);
    expect("samples" in result).toBe(true);
  });
});
