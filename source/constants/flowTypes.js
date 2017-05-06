// @flow

export type grain = {
  start: number,
  end: number,
  amplitude?: number,
  filler?: boolean,
  more?: boolean
};

export type grainArray = Array<grain>;
export type numberArray = Array<number>;
export type objectArray = Array<{}>;
export type mixedArray = Array<mixed>;
export type stringArray = Array<string>;
