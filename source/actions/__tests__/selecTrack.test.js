import { SELECT_TRACK } from "../../constants/actionTypes";
import selectTrack from "../selectTrack";

describe("selectTrack()", () => {

  it("should create an action to select specified track ID", () => {
    const payload = "123ABC";
    const expectedAction = { type: SELECT_TRACK, payload };
    const result = selectTrack(payload);
    expect(result).toEqual(expectedAction);
  })

});
