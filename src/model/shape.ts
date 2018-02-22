export type Row = [number, number, number, number, number];

export interface Shape extends Array<Row> {
  0: [number, number, number, number, number]
  1: [number, number, number, number, number]
  2: [number, number, number, number, number]
  3: [number, number, number, number, number]
  4: [number, number, number, number, number]
}

export class Tetromino {
  shape: Shape
  type: TetrominoType

  constructor(type: TetrominoType) {
    this.type = type
    this.shape = Shapes[type]
  }
}

export enum TetrominoType {
  SQUARE,
  LINE,
  L,
  J,
  T,
  S,
  Z
}

/**
 * Each shape is stored in a 5x5 array because the 4x4
 * piece moves when rotated
 */
export const Shapes = {
  [TetrominoType.SQUARE]: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 2, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ] as Shape,
  [TetrominoType.LINE]: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 2, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ] as Shape,
  [TetrominoType.L]: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 2, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ] as Shape,
  [TetrominoType.J]: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 2, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ] as Shape,
  [TetrominoType.S]: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 2, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0],
  ] as Shape,
  [TetrominoType.Z]: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 2, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ] as Shape,
  [TetrominoType.T]: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 2, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ] as Shape
}
