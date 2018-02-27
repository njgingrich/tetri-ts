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
    this.row = -1 // y
    this.col = (this.boardWidth / 2) - Math.ceil(this.shape.length / 2); // x
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.fill(ctx, Colors[this.type])
  }
  
  public clearNextPiece(ctx: CanvasRenderingContext2D) {
    this.fillNextPiece(ctx, "white")
  }
  
  public drawNextPiece(ctx: CanvasRenderingContext2D) {
    this.fillNextPiece(ctx, Colors[this.type])
  }

  public left(ctx: CanvasRenderingContext2D) {
    this.clear(ctx)
    this.col--
    this.draw(ctx)
  }

  public right(ctx: CanvasRenderingContext2D) {
    this.clear(ctx)
    this.col++
    this.draw(ctx)
  }

  public down(ctx: CanvasRenderingContext2D) {
    this.clear(ctx)
    this.row++
    this.draw(ctx)
  }

  public hardDown(ctx: CanvasRenderingContext2D, dy: number) {
    this.clear(ctx)
    this.row += dy - 1
    this.draw(ctx)
  }

  public rotate(ctx: CanvasRenderingContext2D, nudge: number) {
    this.clear(ctx)
    this.col += nudge
    this.rotation = (this.rotation + 1) % 4
    this.shape = Shapes[this.type][this.rotation]
    this.draw(ctx)
  }
  
  /**
   * Draw the piece onto the board (once it can no longer move).
   * @param setOnBoard Function to draw onto the board
   */
  public set(setOnBoard: Function) {
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape.length; c++) {
        if (!this.shape[r][c]) continue
        setOnBoard(this.row + r, this.col + c, this.type)
      }
    }
  }

  /**
   * Check if the piece is at the top of the board, and if
   * therefore it should be game over.
   */
  public isAtTop() {
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape.length; c++) {
        if (!this.shape[r][c]) continue
        if (this.row + r <= 0) return true
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
  
  private clear(ctx: CanvasRenderingContext2D) {
    this.fill(ctx, "white")
  }
  
  private fillNextPiece(ctx: CanvasRenderingContext2D, fillstyle: string) {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.shape[r] && this.shape[r][c]) {
          if (this.shape[r][c] > 0) {
            ctx.fillStyle = fillstyle
            drawSquare(c, r, ctx, this.size)
          }
        } else {
          ctx.fillStyle = "white"
          drawSquare(c, r, ctx, this.size)
        }
      }
    }
  }
}