import { SET_VIEW } from "../../constants/actionTypes";
import selectTrack from "../setView";

describe("setView()", () => {
  it("should create an action to set view to provided payload", () => {
    const payload = { start: 0, end: 10 };
    const expectedAction = { type: SET_VIEW, payload };
    const result = selectTrack(payload);
    expect(result).toEqual(expectedAction);
  });
});
