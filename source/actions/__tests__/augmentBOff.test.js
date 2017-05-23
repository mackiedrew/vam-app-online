import { AUGMENT_B_OFF } from "../../constants/actionTypes";
import augmentBOff from "../augmentBOff";

describe("augmentBOff() action creator", () => {
  it("produces expected action", () => {
    const expectedAction = { type: AUGMENT_B_OFF };
    const result = augmentBOff();
    expect(result).toEqual(expectedAction);
  });
});
