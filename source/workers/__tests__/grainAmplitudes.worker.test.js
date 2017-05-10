jest.mock("../../help/fileRead", () => ({
  amplitudeCalculator: () => "test"
}));
import grainAmplitudes from "../grainAmplitudes.worker";

describe("grainAmplitudes() Worker", () => {
  it("exports default", () => {
    const result = grainAmplitudes;
    expect(result).toBe(undefined);
  });
});
