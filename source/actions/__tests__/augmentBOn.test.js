import { AUGMENT_B_ON } from "../../constants/actionTypes";
import augmentBOn from "../augmentBOn";

describe("augmentAOn() action creator", () => {
  it("produces expected action", () => {
    const expectedAction = { type: AUGMENT_B_ON };
    const result = augmentBOn();
    expect(result).toEqual(expectedAction);
  });
});
