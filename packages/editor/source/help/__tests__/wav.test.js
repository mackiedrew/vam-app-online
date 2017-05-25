import { processWavData } from "../wav";

describe("processWavData()", () => {
  it("returns required data", () => {
    const data = { sampleRate: 44100, channelData: [0, 1] };
    const result = processWavData(data);
    expect(result).toEqual({ data: 0, sampleRate: 44100 });
  });
});
