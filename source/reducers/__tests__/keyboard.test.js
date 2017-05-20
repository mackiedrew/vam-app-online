import reducer, { DEFAULT_STATE } from "../keyboard";
import {
  SET_OPERATION_HOTKEY,
  RESUME_CONTROLS,
  PAUSE_CONTROLS
} from "../../constants/actionTypes";

describe("keyboard reducer", () => {
  it("should return the initial state", () => {
    const result = reducer(DEFAULT_STATE, {});
    expect(result).toEqual(DEFAULT_STATE);
  });

  it("should not the initial state when the state is null", () => {
    const result = reducer(null, {});
    const expected = null;
    expect(result).toEqual(expected);
  });

  it("should not the initial state when the state is not defined", () => {
    const result = reducer(undefined, {});
    const expected = DEFAULT_STATE;
    expect(result).toEqual(expected);
  });

  it("should handle SET_OPERATION_HOTKEY", () => {
    const mockAction = {
      type: SET_OPERATION_HOTKEY,
      payload: {
        operation: "testOperation",
        value: "p"
      }
    };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      hotkeys: {
        ...DEFAULT_STATE.hotkeys,
        testOperation: {
          value: "p"
        }
      }
    };
    expect(result).toEqual(expected);
  });

  it("should handle RESUME_CONTROLS", () => {
    const mockAction = { type: RESUME_CONTROLS };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      controlsEnabled: true
    };
    expect(result).toEqual(expected);
  });

  it("should handle PAUSE_CONTROLS", () => {
    const mockAction = { type: PAUSE_CONTROLS };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      controlsEnabled: false
    };
    expect(result).toEqual(expected);
  });
});
