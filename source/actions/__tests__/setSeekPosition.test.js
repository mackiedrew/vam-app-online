import { SET_SEEK_POSITION } from "../../constants/actionTypes";
import setSeekPosition from "../setSeekPosition";

describe("setSeekPosition()", () => {
  it("should create an action to select specified track ID", () => {
    const payload = 32312;
    const expectedAction = { type: SET_SEEK_POSITION, payload };
    const result = setSeekPosition(payload);
    expect(result).toEqual(expectedAction);
  });
});
