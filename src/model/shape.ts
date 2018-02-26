// min of 3x3, can be larger
export interface Shape extends Array<number[]> {
  0: [number, number, number]
  1: [number, number, number]
  2: [number, number, number]
}

export enum TetrominoType {
  SQUARE = 1,
  LINE,
  L,
  J,
  T,
  S,
  Z
}

/**
 * Each shape is stored in a 5x5 array because the 4x4 piece moves when rotated.
 * Each rotation of the shape is stored in each object.
 */
export const Shapes = {
  [TetrominoType.SQUARE]: [
    [
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ] as Shape,
    [
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ] as Shape,
    [
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ] as Shape,
    [
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ] as Shape
  ],
  [TetrominoType.LINE]: [
    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ] as Shape,
    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
    ] as Shape,
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
    ] as Shape,
    [
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
    ] as Shape
  ],
  [TetrominoType.L]: [
    [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0]
    ] as Shape,
    [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 3]
    ] as Shape,
    [
      [0, 0, 0],
      [3, 3, 3],
      [3, 0, 0]
    ] as Shape,
    [
      [3, 3, 0],
      [0, 3, 0],
      [0, 3, 0]
    ] as Shape
  ],
  [TetrominoType.J]: [
    [
      [4, 0, 0],
      [4, 4, 4],
      [0, 0, 0]
    ] as Shape,
    [
      [0, 4, 4],
      [0, 4, 0],
      [0, 4, 0]
    ] as Shape,
    [
      [0, 0, 0],
      [4, 4, 4],
      [0, 0, 4]
    ] as Shape,
    [
      [0, 4, 0],
      [0, 4, 0],
      [4, 4, 0]
    ] as Shape
  ],
  [TetrominoType.S]: [
    [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0]
    ] as Shape,
    [
      [0, 5, 0],
      [0, 5, 5],
      [0, 0, 5]
    ] as Shape,
    [
      [0, 0, 0],
      [0, 5, 5],
      [5, 5, 0]
    ] as Shape,
    [
      [5, 0, 0],
      [5, 5, 0],
      [0, 5, 0]
    ] as Shape
  ],
  [TetrominoType.Z]: [
    [
      [6, 6, 0],
      [0, 6, 6],
      [0, 0, 0]
    ] as Shape,
    [
      [0, 0, 6],
      [0, 6, 6],
      [0, 6, 0]
    ] as Shape,
    [
      [0, 0, 0],
      [6, 6, 0],
      [0, 6, 6]
    ] as Shape,
    [
      [0, 6, 0],
      [6, 6, 0],
      [6, 0, 0]
    ] as Shape
  ],
  [TetrominoType.T]: [
    [
      [0, 7, 0],
      [7, 7, 7],
      [0, 0, 0]
    ] as Shape,
    [
      [0, 7, 0],
      [0, 7, 7],
      [0, 7, 0]
    ] as Shape,
    [
      [0, 0, 0],
      [7, 7, 7],
      [0, 7, 0]
    ] as Shape,
    [
      [0, 7, 0],
      [7, 7, 0],
      [0, 7, 0]
    ] as Shape
  ]
}
