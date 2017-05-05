import {
  clearFileInput,
  playElement,
  pauseElement,
  setElementCurrentTime
} from "../dom";

describe("clearFileInput()", () => {
  it("clears the value attribute of passed object", () => {
    const mockTag = {
      type: "file",
      value: "REMOVE-THIS"
    };
    clearFileInput(mockTag);
    expect(mockTag.type).toBe("file");
    expect(mockTag.value).toBe("");
  });
});

describe("playElement()", () => {
  it("calls the play key of the passed object", () => {
    const mockElement = {
      play: sinon.spy()
    };
    playElement(mockElement);
    expect(mockElement.play.called).toBe(true);
  });
});

describe("pauseElement()", () => {
  it("calls the pause key of the passed object", () => {
    const mockElement = {
      pause: sinon.spy()
    };
    pauseElement(mockElement);
    expect(mockElement.pause.called).toBe(true);
  });
});

describe("setElementCurrentTime()", () => {
  it("sets the value to the currentTime key of passed element to be equal to time", () => {
    const mockElement = {
      currentTime: 0
    };
    expect(mockElement.currentTime).toBe(0);
    setElementCurrentTime(mockElement, 5);
    expect(mockElement.currentTime).toBe(5);
  });
});
