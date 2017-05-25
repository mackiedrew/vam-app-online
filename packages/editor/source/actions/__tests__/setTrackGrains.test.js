import { SET_TRACK_GRAINS } from "../../constants/actionTypes";
import setTrackGrains from "../setTrackGrains";

describe("setTrackGrains()", () => {
  it("should create an action to set the grains of specified track", () => {
    const payload = { id: "123ABC", grains: [{ start: 0, end: 10 }] };
    const expectedAction = { type: SET_TRACK_GRAINS, payload };
    const result = setTrackGrains("123ABC", [{ start: 0, end: 10 }]);
    expect(result).toEqual(expectedAction);
  });
});
