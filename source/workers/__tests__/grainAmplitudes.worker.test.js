jest.mock("../../help/grain", () => ({
  amplitudeCalculator: () => "test"
}));
import grainAmplitudes from "../grainAmplitudes.worker";

describe("grainAmplitudes() Worker", () => {
  it("exports default", () => {
    const result = grainAmplitudes;
    expect(result).toBe(undefined);
  });
});
