import { SET_OPERATION_HOTKEY } from "../../constants/actionTypes";
import setOperationHotkey from "../setOperationHotkey";

describe("setOperationHotkey()", () => {
  it("should create an action to set an operation to a new hotkey", () => {
    const expectedAction = {
      type: SET_OPERATION_HOTKEY,
      payload: {
        operation: "testOperation",
        value: "p"
      }
    };
    const result = setOperationHotkey("testOperation", "p");
    expect(result).toEqual(expectedAction);
  });
});
