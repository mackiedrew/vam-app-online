import { SET_TRACK_LENGTH } from "../../constants/actionTypes";
import setTrackLength from "../setTrackLength";

describe("setTrackLength()", () => {
  it("should create an action to set the length of specified track", () => {
    const trackId = "123ABC";
    const data = 44;

    const payload = { id: trackId, length: data };
    const expectedAction = { type: SET_TRACK_LENGTH, payload };
    const result = setTrackLength(trackId, data);
    expect(result).toEqual(expectedAction);
  });
});
