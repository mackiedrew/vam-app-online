import { AUGMENT_C_OFF } from "../../constants/actionTypes";
import augmentCOff from "../augmentCOff";

describe("augmentCOff() action creator", () => {
  it("produces expected action", () => {
    const expectedAction = { type: AUGMENT_C_OFF };
    const result = augmentCOff();
    expect(result).toEqual(expectedAction);
  });
});
