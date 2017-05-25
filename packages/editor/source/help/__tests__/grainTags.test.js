import {
  isGrainQuiet,
  areGrainsQuiet,
  amplitudeCalculator
} from "../grainTags";

describe("isGrainQuiet()", () => {
  const testLoudGrain = { amplitude: 0.5 };
  const testQuietGrain = { amplitude: 0.1 };
  const testCutOff = 0.3;
  const testMaxAmplitude = 1.0;

  it("returns false if the grain amplitude is above threshold", () => {
    const result = isGrainQuiet(testLoudGrain, testCutOff, testMaxAmplitude);
    expect(result).toBe(false);
  });

  it("returns true if the grain amplitude is below threshold", () => {
    const result = isGrainQuiet(testQuietGrain, testCutOff, testMaxAmplitude);
    expect(result).toBe(true);
  });

  it("returns true if the grain amplitude is undefined", () => {
    const result = isGrainQuiet({}, testCutOff, testMaxAmplitude);
    expect(result).toBe(true);
  });
});

describe("areGrainsQuiet()", () => {
  const testGrains = [
    { start: 0, end: 2, amplitude: 0.2 },
    { start: 2, end: 4, amplitude: 0.4 },
    { start: 4, end: 6, amplitude: 0.6 },
    { start: 6, end: 8, amplitude: 0.8 }
  ];
  const testCutOff = 0.5;

  it("returns an array", () => {
    const result = areGrainsQuiet(testGrains, testCutOff);
    expect(typeof result).toBe("object");
  });

  it("returns array the same length of original grains array", () => {
    const result = areGrainsQuiet(testGrains, testCutOff);
    expect(result.length).toBe(testGrains.length);
  });
});

describe("amplitudeCalculator()", () => {
  const testGrains = [
    { start: 0, end: 2 },
    { start: 2, end: 4 },
    { start: 4, end: 6 },
    { start: 6, end: 8 }
  ];

  const testCases = [
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3, 3, 3]
  ];

  it("returns an amplitude tag for each grain entry", () => {
    const result = amplitudeCalculator({
      grains: testGrains,
      cases: testCases
    });
    result.forEach(grain => {
      expect("amplitude" in grain).toBe(true);
      expect(typeof grain.amplitude).toBe("number");
    });
    expect(typeof result).toBe("object");
  });

  it("returns array the same length of original grains array", () => {
    const result = amplitudeCalculator({
      grains: testGrains,
      cases: testCases
    });
    expect(result.length).toBe(testGrains.length);
  });
});
