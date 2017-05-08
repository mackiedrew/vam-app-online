import {
  samplesToMilliseconds,
  samplesToSeconds,
  samplesToMinutes,
  samplesToHours,
  millisecondsToSamples,
  secondsToSamples,
  minutesToSamples,
  hoursToSamples,
  framesToTime,
  framesToTimeStamp
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

describe("framesToTime()", () => {
  const timeSampleTest = 2 * 60 * 60 * 44100 + 30;
  it("returns object with all required keys without sampleRate", () => {
    const result = framesToTime(timeSampleTest);
    expect("h" in result).toBe(true);
    expect("m" in result).toBe(true);
    expect("s" in result).toBe(true);
    expect("ms" in result).toBe(true);
    expect("frames" in result).toBe(true);
  });

  it("returns object with all required keys", () => {
    const result = framesToTime(timeSampleTest, testSampleRate);
    expect("h" in result).toBe(true);
    expect("m" in result).toBe(true);
    expect("s" in result).toBe(true);
    expect("ms" in result).toBe(true);
    expect("frames" in result).toBe(true);
  });

  it("returns object expected values", () => {
    const result = framesToTime(timeSampleTest);
    expect("h" in result).toBe(true);
    expect("m" in result).toBe(true);
    expect("s" in result).toBe(true);
    expect("ms" in result).toBe(true);
    expect("frames" in result).toBe(true);
  });
});

describe("framesToTimeStamp()", () => {
  it("Always returns two time segments", () => {
    const millisecondSpan = 44100 * 0.5;
    const secondSpan = 44100 * 30;
    const minuteSpan = 44100 * 60 * 30;
    const hourSpan = 44100 * 60 * 60 * 6;
    expect(framesToTimeStamp(0, 0).split(":").length).toBe(2);
    expect(
      framesToTimeStamp(44100 * 0.25, millisecondSpan).split(":").length
    ).toBe(2);
    expect(framesToTimeStamp(44100 * 15, secondSpan).split(":").length).toBe(2);
    expect(
      framesToTimeStamp(44100 * 60 * 15, minuteSpan).split(":").length
    ).toBe(2);
    expect(
      framesToTimeStamp(44100 * 60 * 60 * 3, hourSpan).split(":").length
    ).toBe(2);
  });

  describe("provides correct time stamp format when provided with a time span of", () => {
    it("less than a second", () => {
      const frameSpan = 44100 * 0.5;
      const frame = frameSpan / 2;
      const result = framesToTimeStamp(frame, frameSpan);
      expect(result).toMatch(/[0-9]{2}s\:[0-9]{3}/);
    });

    it("30 seconds", () => {
      const frameSpan = 44100 * 30;
      const frame = frameSpan / 2;
      const result = framesToTimeStamp(frame, frameSpan);
      expect(result).toMatch(/[0-9]{2}s\:[0-9]{3}/);
    });

    it("1 minute", () => {
      const frameSpan = 44100 * 60;
      const frame = frameSpan / 2;
      const result = framesToTimeStamp(frame, frameSpan);
      expect(result).toMatch(/[0-9]{2}m\:[0-9]{2}s/);
    });

    it("59 minutes", () => {
      const frameSpan = 44100 * 60 * 59;
      const frame = frameSpan / 2;
      const result = framesToTimeStamp(frame, frameSpan);
      expect(result).toMatch(/[0-9]{2}m\:[0-9]{2}s/);
    });

    it("60 minutes", () => {
      const frameSpan = 44100 * 60 * 60;
      const frame = frameSpan / 2;
      const result = framesToTimeStamp(frame, frameSpan);
      expect(result).toMatch(/[0-9]{2}h\:[0-9]{2}m/);
    });

    it("60 hours", () => {
      const frameSpan = 44100 * 60 * 60 * 60;
      const frame = frameSpan / 2;
      const result = framesToTimeStamp(frame, frameSpan);
      expect(result).toMatch(/[0-9]{2}h\:[0-9]{2}m/);
    });
  });
});
