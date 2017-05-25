import { logicalSegment, leadingZeros, divisionBinarySearch } from "../generic";

describe("logicalSegment()", () => {
  const testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  it("generates the correct number of segments", () => {
    expect(logicalSegment(testArray, 2).length).toEqual(5);
    expect(logicalSegment(testArray, 3).length).toEqual(4);
    expect(logicalSegment(testArray, 4).length).toEqual(3);
    expect(logicalSegment(testArray, 5).length).toEqual(2);
  });

  it("both start and end keys are generated for every segment", () => {
    const segments = logicalSegment(testArray, 3);
    const passingSegments = segments.reduce((passing, segment) => {
      const startExists = segment.start !== undefined;
      const endExists = segment.end !== undefined;
      if (startExists && endExists) {
        return passing + 1;
      }
      return passing;
    }, 0);
    expect(passingSegments).toEqual(segments.length);
  });

  it("last end segment is equal to value length of the array minus one", () => {
    const segments = logicalSegment(testArray, 3);
    expect(segments[segments.length - 1].end).toEqual(9);
  });

  it("returns equal segments of proper size, except for the last segment size", () => {
    const segmentSize = 3;
    const segments = logicalSegment(testArray, segmentSize);
    const segmentLengths = segments.map(({ start, end }) => end - start);
    const segmentLengthsTotal = segmentLengths
      .slice(0, -1)
      .reduce((a, b) => a + b, 0);
    const segmentMean = segmentLengthsTotal / (segments.length - 1);
    expect(segmentMean).toEqual(segmentSize);

    const danglingLength = segmentLengthsTotal - (testArray.length - 1);
    expect(segmentLengths[segmentLengths.length - 1]).toEqual(danglingLength);
  });

  it("returns segments with which the end value of [n] is equal to start of [n+1]", () => {
    const segmentSize = 3;
    const segments = logicalSegment(testArray, segmentSize);
    expect(segments[0].start).toEqual(0);
    segments.slice(1, -1).forEach(({ start, end }, index) => {
      const previousEnd = segments[index].end;
      expect(start).toEqual(previousEnd);
    });
    expect(segments[segments.length - 1].end).toEqual(testArray.length - 1);
  });
});

describe("divisionBinarySearch()", () => {
  const mockTarget = 12;
  const mockDivisionArray = [
    {
      start: 0,
      end: 10
    },
    {
      start: 10,
      end: 20
    },
    {
      start: 20,
      end: 30
    },
    {
      start: 30,
      end: 40
    },
    {
      start: 50,
      end: 60
    },
    {
      start: 70,
      end: 80
    }
  ];

  it("quick fails when an empty divisionArray is provided", () => {
    const result = divisionBinarySearch(mockTarget, []);
    expect(result).toBe(-1);
  });

  it("quick fails when an empty divisionArray is undefined", () => {
    const result = divisionBinarySearch(mockTarget, undefined);
    expect(result).toBe(-1);
  });

  it("quick fails when the mockTarget is less than 0", () => {
    const result = divisionBinarySearch(-1, mockDivisionArray);
    expect(result).toBe(-1);
  });

  it("quick fails when the mockTarget is higher than the sorted array goes", () => {
    const result = divisionBinarySearch(81, mockDivisionArray);
    expect(result).toBe(-1);
  });

  it("returns the proper result when given proper arguments and below first middle", () => {
    const result = divisionBinarySearch(mockTarget, mockDivisionArray);
    expect(result).toBe(1);
  });

  it("returns the proper result when given proper arguments and above first middle", () => {
    const result = divisionBinarySearch(79, mockDivisionArray);
    expect(result).toBe(5);
  });
});

describe("leadingZeros()", () => {
  it("doesn't affect a number larger than columns provided (default columns).", () => {
    const test = 1300;
    const result = leadingZeros(test);
    const expectedResult = String(test);
    expect(result).toBe(expectedResult);
  });

  it("doesn't affect a number larger than columns provided.", () => {
    const test = 1300;
    const result = leadingZeros(test, 3);
    const expectedResult = String(test);
    expect(result).toBe(expectedResult);
  });

  it("returns appropriate length string with default columns", () => {
    const test = 3;
    const result = leadingZeros(test);
    const expectedResult = "03";
    expect(result.length).toBe(expectedResult.length);
  });

  it("returns appropriate length string", () => {
    const test = 1300;
    const result = leadingZeros(test, 8);
    const expectedResult = "00001300";
    expect(result.length).toBe(expectedResult.length);
  });
});
