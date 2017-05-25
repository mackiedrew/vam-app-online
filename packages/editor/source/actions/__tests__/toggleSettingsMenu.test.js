import { TOGGLE_SETTINGS_MENU } from "../../constants/actionTypes";
import toggleSettingsMenu from "../toggleSettingsMenu";

describe("toggleSettingsMenu()", () => {
  it("should create an action to toggle settings menu open", () => {
    const expectedAction = { type: TOGGLE_SETTINGS_MENU };
    const result = toggleSettingsMenu();
    expect(result).toEqual(expectedAction);
  });
});
