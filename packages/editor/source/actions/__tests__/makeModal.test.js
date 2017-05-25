import { MAKE_MODAL } from "../../constants/actionTypes";
import makeModal from "../makeModal";

describe("makeModal()", () => {
  it("should create an action containing modal data", () => {
    const expectedAction = {
      type: MAKE_MODAL,
      payload: {
        type: "MODAL_1",
        data: { test: "object" }
      }
    };
    const result = makeModal("MODAL_1", { test: "object" });
    expect(result).toEqual(expectedAction);
  });
});
