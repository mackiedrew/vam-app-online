import { CHANGE_SETTING_VALUE } from "../../constants/actionTypes";
import changeSettingValue from "../changeSettingValue";

describe("changeSettingValue()", () => {
  it("should create an action to set a setting to a new value", () => {
    const expectedAction = {
      type: CHANGE_SETTING_VALUE,
      payload: {
        setting: "testSetting",
        value: 89
      }
    };
    const result = changeSettingValue("testSetting", 89);
    expect(result).toEqual(expectedAction);
  });
});
