import configureStore from "../configureStore";

const mockInitialState = {};

describe("configureStore()", () => {
  it("returns an object", () => {
    const result = configureStore(mockInitialState);
    expect(typeof result).toBe("object");
  });
});
