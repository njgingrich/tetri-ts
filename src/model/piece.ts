import { TetrominoType, Shape, Shapes } from './shape'
import { Colors } from '../util/color'
import { drawSquare } from '../util'

export class Piece {
  type: TetrominoType
  boardWidth: number
  size: number
  
  rotation: number
  shape: Shape
  row: number
  col: number
  color: string

  constructor(type: TetrominoType,
              boardWidth: number,
              size: number) {

    this.type = type
    this.boardWidth = boardWidth
    this.size = size

    this.rotation = 0
    this.color = Colors[this.type]
    this.shape = Shapes[this.type][this.rotation]
    this.row = -2 // y
    this.col = (this.boardWidth / 2) - Math.ceil(this.shape.length / 2); // x
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.fill(ctx, Colors[this.type])
  }

  public clear(ctx: CanvasRenderingContext2D) {
    this.fill(ctx, "white")
  }

  public left(ctx: CanvasRenderingContext2D, collides: Function) {
    if (collides(this, -1, 0, this.shape)) {
      return
    }

    this.clear(ctx)
    this.col--
    this.draw(ctx)
  }

  public right(ctx: CanvasRenderingContext2D, collides: Function) {
    if (collides(this, 1, 0, this.shape)) {
      return
    }

    this.clear(ctx)
    this.col++
    this.draw(ctx)
  }

  public down(
    ctx: CanvasRenderingContext2D,
    collides: Function,
    setOnBoard: Function
  ): Piece | boolean {
    if (collides(this, 0, 1, this.shape)) {
      if (this.set(setOnBoard)) return true
      return Piece.randomPiece(this.boardWidth, this.size)
    }

    this.clear(ctx)
    this.row++
    this.draw(ctx)
    return false
  }

  public hardDown(ctx: CanvasRenderingContext2D, collides: Function) {
    let dy = 1
    while (!collides(this, 0, dy, this.shape)) {
      dy++
    }

    this.clear(ctx)
    this.row += dy - 1
    this.draw(ctx)
  }

  public rotate(ctx: CanvasRenderingContext2D, collides: Function) {
    const nextRotation = Shapes[this.type][(this.rotation + 1) % 4]
    let nudge = 0

    if (collides(this, 0, 0, nextRotation)) {
      nudge = this.col > this.boardWidth / 2 ? -1 : 1
    }


    if (collides(this, nudge, 0, nextRotation)) {
      return
    }

    this.clear(ctx)
    this.col += nudge
    this.rotation = (this.rotation + 1) % 4
    this.shape = Shapes[this.type][this.rotation]
    this.draw(ctx)
  }
  
  public set(setOnBoard: Function): boolean {
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape.length; c++) {
        if (!this.shape[r][c]) continue

        if (this.row + r < 0) {
          return true
        }

        setOnBoard(this.row + r, this.col + c, this.type)
      }
    }
    return false
  }

  public static getRandomType(): number {
    return Math.floor(Math.random() * 7) + 1
  }

  public static randomPiece(boardWidth: number, size: number): Piece {
    const newType = Piece.getRandomType()
    return new Piece(
      newType,
      boardWidth,
      size
    )
  }
  
  private fill(ctx: CanvasRenderingContext2D, fillstyle: string) {
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape.length; c++) {
        let cell = this.shape[r][c]
        if (cell > 0) {
          ctx.fillStyle = fillstyle
          drawSquare(this.col + c, this.row + r, ctx, this.size)
        }
      }
    }
  }
}