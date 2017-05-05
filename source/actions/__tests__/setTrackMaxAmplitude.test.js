import { SET_TRACK_MAX_AMPLITUDE } from "../../constants/actionTypes";
import setTrackMaxAmplitude from "../setTrackMaxAmplitude";

describe("setTrackMaxAmplitude()", () => {
  it("should create an action to set the maxAmplitude of specified track", () => {
    const trackId = "123ABC";
    const data = 2.3;

    const payload = { id: trackId, maxAmplitude: data };
    const expectedAction = { type: SET_TRACK_MAX_AMPLITUDE, payload };
    const result = setTrackMaxAmplitude(trackId, data);
    expect(result).toEqual(expectedAction);
  });
});
