import { AUGMENT_A_OFF } from "../../constants/actionTypes";
import augmentAOff from "../augmentAOff";

describe("augmentAOff() action creator", () => {
  it("produces expected action", () => {
    const expectedAction = { type: AUGMENT_A_OFF };
    const result = augmentAOff();
    expect(result).toEqual(expectedAction);
  });
});
