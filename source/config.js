const configuration = {
  /* 
   * A slice is a physically separated portion chopped off of the main loaded track,
   * this is to help loading times and resource usage. They should all be the same length
   * minus the final slice which will simply be the remaining time.
   */
  slices: {
    target: 120 // seconds
  },

  /* 
   * A grain is a small `logical` division in the track, it should be ideally ambivalent to
   * what the slices are doing. They should be logically divided, attempting to not segment words,
   * phrases, or sentences. Likely to be cut down silent regions. It should also be a goal to 
   * target logical edit segments.
   */
  grains: {
    temp: 0.2, // second -- Used for making grains until a proper system is designed
    min: 0.1, // seconds
    max: 20 // seconds
  },

  /* 
   * Chunks are any larger divisions beyond grains, they are simple groupings of grains which should
   * make editing large files much quicker. They should be logical groupings trying to match similar
   * grains together. Fine is smaller than coarse.
   */
  chunks: {
    // Smallest
    fine: {
      min: 5, // grains
      max: 20 // grains
    },

    // Largest
    coarse: {
      min: 5, // fine chunks
      max: 20 // fine chunks
    }
  }
};

export default configuration;
