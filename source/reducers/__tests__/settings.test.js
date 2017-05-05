import reducer, { DEFAULT_STATE } from "../settings";
import { CHANGE_SETTING_VALUE } from "../../constants/actionTypes";

describe("settings reducer", () => {
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

  it("should handle CHANGE_SETTING_VALUE", () => {
    const mockAction = {
      type: CHANGE_SETTING_VALUE,
      payload: {
        setting: "testSetting",
        value: 10
      }
    };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      testSetting: {
        value: 10
      }
    };
    expect(result).toEqual(expected);
  });
});
