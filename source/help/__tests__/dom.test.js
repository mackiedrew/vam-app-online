import { clearFileInput } from "../dom";

describe("clearFileInput()", () => {

  it("clears the value attribute of passed object", () => {
    const mockTag = {
      type: "file",
      value: "REMOVE-THIS"
    };
    clearFileInput(mockTag);
    expect(mockTag.type).toBe("file");
    expect(mockTag.value).toBe("");
  });

});
