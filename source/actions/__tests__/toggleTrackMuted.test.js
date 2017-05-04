import { TOGGLE_TRACK_MUTED } from "../../constants/actionTypes";
import toggleTrackMuted from "../toggleTrackMuted";

describe("toggleTrackMuted()", () => {
  it("should create an action to toggle the muted key of a track", () => {
    const payload = "123ABC";
    const expectedAction = { type: TOGGLE_TRACK_MUTED, payload };
    const result = toggleTrackMuted(payload);
    expect(result).toEqual(expectedAction);
  });
});
