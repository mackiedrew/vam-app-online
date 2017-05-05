import { SHIFT_SEEK_POSITION } from "../../constants/actionTypes";
import shiftSeekPosition from "../shiftSeekPosition";

describe("shiftSeekPosition()", () => {
  it("should create an action to shift the seek position", () => {
    const payload = 10;
    const expectedAction = { type: SHIFT_SEEK_POSITION, payload };
    const result = shiftSeekPosition(payload);
    expect(result).toEqual(expectedAction);
  });
});
