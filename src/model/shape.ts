// min of 3x3, can be larger
export interface Shape extends Array<number[]> {
  0: [number, number, number]
  1: [number, number, number]
  2: [number, number, number]
}

export class Tetromino {
  shape: Shape
  type: TetrominoType
  rotation: number

  constructor(type: TetrominoType, rotation = 0) {
    this.type = type
    this.rotation = rotation
    this.shape = Shapes[type][this.rotation]
  }
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
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ] as Shape,
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ] as Shape,
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ] as Shape,
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ] as Shape,
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

/**
 * Relative coordinates of starting point for each shape
 * [hor, vert] i.e. [2, 1] means move left 2, up 1
 */
export const Offset = {
  [TetrominoType.SQUARE]: [[1, 2], [1, 2], [1, 2], [1, 2]],
  [TetrominoType.LINE]:   [[1, 2], [2, 1], [0, 2], [2, 0]],
  [TetrominoType.L]:      [[1, 1], [0, 2], [0, 1], [0, 1]],
  [TetrominoType.J]:      [[0, 1], [1, 1], [2, 1], [1, 2]],
  [TetrominoType.S]:      [[1, 1], [0, 2], [0, 1], [0, 1]],
  [TetrominoType.Z]:      [[1, 1], [0, 2], [0, 1], [0, 1]],
  [TetrominoType.T]:      [[1, 1], [0, 2], [0, 1], [0, 1]],
}