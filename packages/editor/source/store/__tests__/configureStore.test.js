import configureStore from "../configureStore";

const mockInitialState = {};

describe("configureStore()", () => {
  it("returns an object when hot loading disabled", () => {
    module.hot = false;
    const result = configureStore(mockInitialState);
    expect(typeof result).toBe("object");
  });

  it("returns an object when hot loading enabled", () => {
    module.hot = true;
    const result = configureStore(mockInitialState);
    expect(typeof result).toBe("object");
  });
});
