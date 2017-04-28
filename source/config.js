const configuration = {
  grain: {
    label: "Grain Time",
    value: 5,
    unit: "s",
    type: "number"
  },
  quietCutoff: {
    label: "Quietness Threshold",
    value: 10,
    unit: "%",
    type: "number"
  },
  play: {
    label: "Play/Pause Key",
    value: "p",
    type: "text"
  },
  next: {
    label: "Next Grain Key",
    value: "e",
    type: "text"
  },
  previous: {
    label: "Previous Grain Key",
    value: "q",
    type: "text"
  },
  nextTrack: {
    label: "Next Track Key",
    value: "j",
    type: "text"
  },
  previousTrack: {
    label: "Previous Track Key",
    value: "k",
    type: "text"
  }
};

export default configuration;
