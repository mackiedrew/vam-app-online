import { SET_TRACK_FILE_NAME } from "../../constants/actionTypes";
import setTrackFileName from "../setTrackFileName";

describe("setTrackFileName()", () => {
  it("should create an action to set the fileName of specified track", () => {
    const payload = { id: "123ABC", fileName: "TRY-THIS.ext" };
    const expectedAction = { type: SET_TRACK_FILE_NAME, payload };
    const result = setTrackFileName("123ABC", "TRY-THIS.ext");
    expect(result).toEqual(expectedAction);
  });
});
