import { TetrominoType, Shape, Shapes } from './shape'
import { Colors } from './color'
import { drawSquare } from '../util'

export class Piece {
  type: TetrominoType
  rotation: number
  shape: Shape
  row: number
  col: number
  color: string
  ctx: CanvasRenderingContext2D
  size: number

  constructor(type: TetrominoType, boardWidth: number, ctx: CanvasRenderingContext2D, size: number) {
    this.type = type
    this.color = Colors[this.type]
    this.rotation = 0
    this.shape = Shapes[this.type][this.rotation]

    this.row = -2 // y
    this.col = (boardWidth / 2) - Math.ceil(this.shape.length / 2); // x
    this.ctx = ctx
    this.size = size
  }

  public draw() {
    this.fill(Colors[this.type])
  }

  public clear() {
    this.fill("white")
  }

  private fill(fillstyle: string) {
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape.length; c++) {
        let cell = this.shape[c][r]
        if (cell > 0) {
          this.ctx.fillStyle = fillstyle
          drawSquare(this.col + c, this.row + r, this.ctx, this.size)
        }
      }
    }
  }

  public left() {
    this.clear()
    this.col--
    this.draw()
  }

  public right() {
    this.clear()
    this.col++
    this.draw()
  }

  public down() {
    this.clear()
    this.row++
    this.draw()
  }

  public rotate() {
    this.clear()
    this.rotation = (this.rotation + 1) % 4
    this.shape = Shapes[this.type][this.rotation]
    this.draw()
  }
}