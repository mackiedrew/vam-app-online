import { TOGGLE_FILTERS_MENU } from "../../constants/actionTypes";
import toggleFiltersMenu from "../toggleFiltersMenu";

describe("toggleFiltersMenu()", () => {
  it("should create an action to toggle filters menu open", () => {
    const expectedAction = { type: TOGGLE_FILTERS_MENU };
    const result = toggleFiltersMenu();
    expect(result).toEqual(expectedAction);
  });
});
