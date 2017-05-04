import reducer, { DEFAULT_STATE } from "../ui";
import {
  TOGGLE_SETTINGS_MENU,
  TOGGLE_FILTERS_MENU
} from "../../constants/actionTypes";

describe("ui reducer", () => {
  it("should return the initial state", () => {
    const result = reducer(DEFAULT_STATE, {});
    const expected = {
      settingsOpen: false,
      filtersOpen: false
    };
    expect(result).toEqual(expected);
  });

  it("should not the initial state when the state is not defined", () => {
    const result = reducer(null, {});
    const expected = null;
    expect(result).toEqual(expected);
  });

  it("should handle TOGGLE_SETTINGS_MENU", () => {
    const mockAction = { type: TOGGLE_SETTINGS_MENU };
    const firstResult = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      settingsOpen: true,
      filtersOpen: false
    };
    expect(firstResult).toEqual(expected);
    const secondResult = reducer(firstResult, mockAction);
    expect(secondResult).toEqual(DEFAULT_STATE);
  });

  it("should handle TOGGLE_FILTERS_MENU", () => {
    const mockAction = { type: TOGGLE_FILTERS_MENU };
    const firstResult = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      settingsOpen: false,
      filtersOpen: true
    };
    expect(firstResult).toEqual(expected);
    const secondResult = reducer(firstResult, mockAction);
    expect(secondResult).toEqual(DEFAULT_STATE);
  });
});
