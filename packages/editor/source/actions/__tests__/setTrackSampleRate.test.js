import { SET_TRACK_SAMPLE_RATE } from "../../constants/actionTypes";
import setTrackSampleRate from "../setTrackSampleRate";

describe("setTrackSampleRate()", () => {
  it("should create an action to set the sampleRate of specified track", () => {
    const trackId = "123ABC";
    const data = 2.3;

    const payload = { id: trackId, sampleRate: data };
    const expectedAction = { type: SET_TRACK_SAMPLE_RATE, payload };
    const result = setTrackSampleRate(trackId, data);
    expect(result).toEqual(expectedAction);
  });
});
