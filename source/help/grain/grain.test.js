import {
  splitGrainIntoTwo,
  splitGrain,
  createEquallySpacedGrains
} from "./grain";
import { samplesToSeconds } from "../wav/wav";

const mockSimpleGrain = {
  start: 4000,
  end: 8001,
}

const mockMetaGrain = {
  start: 4000,
  end: 8001,
  meta: true
}

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
  },
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
    const [ left, right ] = splitGrainIntoTwo(mockSimpleGrain, splitPoint);
    expect(left.start).toBe(start);
    expect(left.end).toBe(splitPoint);
    expect(right.start).toBe(splitPoint);
    expect(right.end).toBe(end);
  });

  it("returns an array with two split grains containing meta data of original", () => {
    const splitPoint = 6000;
    const [ left, right ] = splitGrainIntoTwo(mockMetaGrain, splitPoint);
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
    const resultDangle = createEquallySpacedGrains(testData, samplesToSeconds(4));
    expect(resultDangle.length).toBe(3);
    expect(resultEven.length).toBe(5);
  });

});
