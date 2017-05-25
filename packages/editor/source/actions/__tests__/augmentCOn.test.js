import { AUGMENT_C_ON } from "../../constants/actionTypes";
import augmentCOn from "../augmentCOn";

describe("augmentCOn() action creator", () => {
  it("produces expected action", () => {
    const expectedAction = { type: AUGMENT_C_ON };
    const result = augmentCOn();
    expect(result).toEqual(expectedAction);
  });
});
