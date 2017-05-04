import {
  splitGrainIntoTwo,
  splitGrain,
  createEquallySpacedGrains,
  grainLengths,
  createSampleCases,
  isGrainQuiet,
  areGrainsQuiet,
  grainIndexesInView,
  createFillerGrain,
  determineWhichGrainsToShow
} from "../grain";
import { samplesToSeconds } from "../convert";

const mockSimpleGrain = {
  start: 4000,
  end: 8001
};

const mockMetaGrain = {
  start: 4000,
  end: 8001,
  meta: true
};

const mockGrains = [
  {
    start: 0,
    end: 1001
  },
  {
    start: 1001,
    end: 2001
  },
  {
    start: 2001,
    end: 3001
  },
  {
    start: 3001,
    end: 4001
  }
];

describe("splitGrainIntoTwo()", () => {
  it("returns the original grain if splitPoint significantly too low", () => {
    const splitPoint = 2000;
    const result = splitGrainIntoTwo(mockSimpleGrain, splitPoint)[0];
    expect(result).toBe(mockSimpleGrain);
  });

  it("returns the original grain if splitPoint equal to grain.start", () => {
    const splitPoint = mockSimpleGrain.start;
    const result = splitGrainIntoTwo(mockSimpleGrain, splitPoint)[0];
    expect(result).toBe(mockSimpleGrain);
  });

  it("returns the original grain if splitPoint significantly too high", () => {
    const splitPoint = 10000;
    const result = splitGrainIntoTwo(mockSimpleGrain, splitPoint)[0];
    expect(result).toBe(mockSimpleGrain);
  });

  it("returns the original grain if splitPoint is grain.end minus 1", () => {
    const splitPoint = mockSimpleGrain.end - 1;
    const result = splitGrainIntoTwo(mockSimpleGrain, splitPoint)[0];
    expect(result).toBe(mockSimpleGrain);
  });

  it("returns an array of length two if the splitPoint is within bounds", () => {
    const splitPoint = 6000;
    const result = splitGrainIntoTwo(mockSimpleGrain, splitPoint);
    expect(typeof result).toBe("object");
    expect(result.length).toBe(2);
  });

  it("returns an array with properly split grains", () => {
    const splitPoint = 6000;
    const { start, end } = mockSimpleGrain;
    const [left, right] = splitGrainIntoTwo(mockSimpleGrain, splitPoint);
    expect(left.start).toBe(start);
    expect(left.end).toBe(splitPoint);
    expect(right.start).toBe(splitPoint);
    expect(right.end).toBe(end);
  });

  it("returns an array with two split grains containing meta data of original", () => {
    const splitPoint = 6000;
    const [left, right] = splitGrainIntoTwo(mockMetaGrain, splitPoint);
    expect(left.meta).toBe(true);
    expect(right.meta).toBe(true);
  });
});

describe("splitGrain()", () => {
  it("returns the original grains array if splitPoint significantly too low", () => {
    const splitPoint = -1000;
    const result = splitGrain(mockGrains, splitPoint);
    expect(result).toBe(mockGrains);
  });

  it("returns the original grains array if splitPoint equal to grains[0].start", () => {
    const splitPoint = mockGrains[0].start;
    const result = splitGrain(mockGrains, splitPoint);
    expect(result).toBe(mockGrains);
  });

  it("returns the original grains array if splitPoint significantly too high", () => {
    const splitPoint = 5000;
    const result = splitGrain(mockGrains, splitPoint);
    expect(result).toBe(mockGrains);
  });

  it("returns the original grains array if splitPoint is grains[last].end minus 1", () => {
    const splitPoint = mockGrains[mockGrains.length - 1].end - 1;
    const result = splitGrain(mockGrains, splitPoint);
    expect(result).toBe(mockGrains);
  });

  it("returns the original grains array if splitPoint on a cut point between grains", () => {
    const splitPoint = mockGrains[1].start;
    const result = splitGrain(mockGrains, splitPoint);
    expect(result).toEqual(mockGrains);
  });

  it("returns an array of length one higher than the original grains array", () => {
    const expectedLength = mockGrains.length + 1;
    const splitPoint = 1500;
    const result = splitGrain(mockGrains, splitPoint);
    expect(result.length).toEqual(expectedLength);
  });
});

describe("createEquallySpacedGrains()", () => {
  const testData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  it("returns an array", () => {
    const result = createEquallySpacedGrains(testData, 2);
    expect(typeof result).toBe("object");
  });

  it("returns an array of appropriate length", () => {
    const resultEven = createEquallySpacedGrains(testData, samplesToSeconds(2));
    const resultDangle = createEquallySpacedGrains(
      testData,
      samplesToSeconds(4)
    );
    expect(resultDangle.length).toBe(3);
    expect(resultEven.length).toBe(5);
  });
});

describe("grainLengths()", () => {
  const testGrains = [
    { start: 0, end: 10 },
    { start: 10, end: 20 },
    { start: 20, end: 30 },
    { start: 30, end: 40 },
    { start: 40, end: 50 }
  ];

  it("returns an array", () => {
    const result = grainLengths(testGrains);
    expect(typeof result).toBe("object");
  });

  it("returns an array with same length as original", () => {
    const originalLength = testGrains.length;
    const result = grainLengths(testGrains);
    expect(result.length).toBe(originalLength);
  });
});

describe("createSampleCases()", () => {
  const testGrains = [
    { start: 0, end: 2 },
    { start: 2, end: 4 },
    { start: 4, end: 6 },
    { start: 6, end: 8 }
  ];
  const testData = [0, 1, 2, 3, 4, 5, 6, 7];

  it("returns an array", () => {
    const result = createSampleCases(testGrains, testData, 1);
    expect(typeof result).toBe("object");
  });

  it("returns an array with same length as original grains array", () => {
    const result = createSampleCases(testGrains, testData, 1);
    expect(result.length).toBe(testGrains.length);
  });
});

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

describe("grainIndexesInView()", () => {
  const testGrains = [
    { start: 0, end: 2 },
    { start: 2, end: 4 },
    { start: 4, end: 6 },
    { start: 6, end: 8 }
  ];
  const testView = {
    start: 2,
    end: 5
  };
  const testGrainsLength = testGrains[testGrains.length - 1].end;
  const basicResult = grainIndexesInView(
    testGrains,
    testView,
    testGrainsLength
  );

  it("returns an array with startIndex and endIndex", () => {
    expect(basicResult.startIndex).toBeDefined();
    expect(basicResult.endIndex).toBeDefined();
  });

  it("returns an array with startIndex being less than or equal to endIndex", () => {
    expect(basicResult.startIndex).toBeLessThanOrEqual(basicResult.endIndex);
  });

  // it("returns full array indexes when provided with a view equal to span of grains", () => {
  //   const fullView = {
  //     start: 0,
  //     end: 8
  //   };
  //   const result = grainIndexesInView(testGrains, fullView, testGrainsLength);
  //   expect(result.startIndex).toBe(0);
  //   expect(result.endIndex).toBe(3);
  // });

  // it("returns full array indexes when view.end is beyond end of grains", () => {
  //   const extraView = {
  //     start: 0,
  //     end: 70
  //   };
  //   const result = grainIndexesInView(testGrains, extraView, 70);
  //   expect(result.startIndex).toBe(0);
  //   expect(result.endIndex).toBe(3);
  // });

  // it("returns expected grain indexes in typical conditions", () => {
  //   const result = grainIndexesInView(testGrains, testView, testGrainsLength);
  //   expect(result.startIndex).toBe(1);
  //   expect(result.endIndex).toBe(1);
  // });
});

describe("createFillerGrain()", () => {
  const result = createFillerGrain(10, 20, false);

  it("returns an object", () => {
    expect(typeof result).toBe("object");
  });

  it("returns object with provided values of keys `start`, `end`, and `more`", () => {
    expect(result.start).toBe(10);
    expect(result.end).toBe(20);
    expect(result.more).toBe(false);
  });

  it("returns object with key of filler", () => {
    expect(result.filler).toBe(true);
  });
});

// describe("determineWhichGrainsToShow()", () => {
//   it("returns grains of at least length of two");
//   it("returns array of only objects");
// });
