import { AUGMENT_A_ON } from "../../constants/actionTypes";
import augmentAOn from "../augmentAOn";

describe("augmentAOn() action creator", () => {
  it("produces expected action", () => {
    const expectedAction = { type: AUGMENT_A_ON };
    const result = augmentAOn();
    expect(result).toEqual(expectedAction);
  });
});
