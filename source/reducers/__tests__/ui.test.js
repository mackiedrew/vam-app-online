import reducer, { DEFAULT_STATE } from "../ui";
import {
  TOGGLE_SETTINGS_MENU,
  CLEAR_MODAL,
  MAKE_MODAL
} from "../../constants/actionTypes";

describe("ui reducer", () => {
  it("should return the initial state", () => {
    const result = reducer(DEFAULT_STATE, {});
    const expected = {
      settingsOpen: false,
      modalType: "NONE",
      modalData: {}
    };
    expect(result).toEqual(expected);
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

  it("should handle TOGGLE_SETTINGS_MENU", () => {
    const mockAction = { type: TOGGLE_SETTINGS_MENU };
    const firstResult = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      settingsOpen: true
    };
    expect(firstResult).toEqual(expected);
    const secondResult = reducer(firstResult, mockAction);
    expect(secondResult).toEqual(DEFAULT_STATE);
  });

  it("should handle CLEAR_MODAL", () => {
    const mockAction = { type: CLEAR_MODAL };
    const firstResult = reducer(DEFAULT_STATE, mockAction);
    const expected = DEFAULT_STATE;
    expect(firstResult).toEqual(expected);
  });

  it("should handle MAKE_MODAL", () => {
    const mockAction = {
      type: MAKE_MODAL,
      payload: {
        type: "MODAL_1",
        data: { test: "object" }
      }
    };
    const firstResult = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      modalType: "MODAL_1",
      modalData: { test: "object" }
    };
    expect(firstResult).toEqual(expected);
  });
});
