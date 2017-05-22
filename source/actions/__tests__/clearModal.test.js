import { CLEAR_MODAL } from "../../constants/actionTypes";
import clearModal from "../clearModal";

describe("clearModal()", () => {
  it("should create an action that clears modal type and data", () => {
    const expectedAction = { type: CLEAR_MODAL };
    const result = clearModal();
    expect(result).toEqual(expectedAction);
  });
});
