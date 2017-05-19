import {
  range,
  zipObjectArray,
  getKeyFromObjectArray,
  objectToArray
} from "../collections";

describe("range()", () => {
  it("produces an iterable array", () => {
    const result = range(5);
    result.map(a => a);
  });

  it("produces correct array length", () => {
    const calculation = range(5);
    const result = calculation.length;
    const expected = 5;
    expect(result).toBe(expected);
  });

  it("produces correct array", () => {
    const result = range(5);
    const expected = [0, 1, 2, 3, 4];
    expect(result).toEqual(expected);
  });
});

describe("zipObjectArray()", () => {
  const testArray = [
    { test1: "ABC", test2: "123" },
    { test1: "DEF", test2: "456" }
  ];
  const testKey = "addedKey";
  const testValues = ["dog", "cat"];

  it("returns an array of original length", () => {
    const result = zipObjectArray(testArray, testKey, testValues);
    const expectedLength = 2;
    expect(result.length).toBe(expectedLength);
  });

  it("returns an array with each entry containing a new key", () => {
    const result = zipObjectArray(testArray, testKey, testValues);
    result.forEach(entry => {
      expect(testKey in entry).toBe(true);
    });
  });

  it("returns an array with each entry containing a new key, even when provided no values", () => {
    const result = zipObjectArray(testArray, testKey, []);
    result.forEach(entry => {
      expect(testKey in entry).toBe(true);
    });
  });
});

describe("getKeyFromObjectArray()", () => {
  const testArray = [
    { test1: "ABC", test2: "123" },
    { test1: "DEF", test2: "456" }
  ];

  const testHoleArray = [{ test1: "ABC" }, { test1: "DEF", test2: "456" }];

  it("returns an array of original length", () => {
    const result = getKeyFromObjectArray(testArray, "test2");
    const expectedLength = testArray.length;
    expect(result.length).toBe(expectedLength);
  });

  it("returns an array of original length, even if there is no key for an entry", () => {
    const result = getKeyFromObjectArray(testHoleArray, "test2");
    const expectedLength = testArray.length;
    expect(result.length).toBe(expectedLength);
  });
});

describe("objectToArray()", () => {
  const testObject = {
    dog: "123",
    cat: "456",
    lol: "789"
  };

  it("returns an array the length of the number of keys in the original object", () => {
    const result = objectToArray(testObject);
    const expectedLength = result.length;
    expect(result.length).toBe(expectedLength);
  });
});
