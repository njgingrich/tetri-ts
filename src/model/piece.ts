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

  /**
   * Draw the piece onto the canvas with the given context.
   *
   * @param ctx The drawing context
   */
  public draw(ctx: CanvasRenderingContext2D) {
    this.fill(ctx, Colors[this.type])
  }

  /**
   * Move a piece left and redraw it.
   *
   * @param ctx The drawing context
   */
  public left(ctx: CanvasRenderingContext2D) {
    this.clear(ctx)
    this.col--
    this.draw(ctx)
  }

  /**
   * Move a piece right and redraw it.
   *
   * @param ctx The drawing context
   */
  public right(ctx: CanvasRenderingContext2D) {
    this.clear(ctx)
    this.col++
    this.draw(ctx)
  }

  /**
   * Move a piece down and redraw it.
   *
   * @param ctx The drawing context
   */
  public down(ctx: CanvasRenderingContext2D) {
    this.clear(ctx)
    this.row++
    this.draw(ctx)
  }

  /**
   * Move a piece as far down as it can without colliding and redraw it.
   *
   * @param ctx The drawing context
   * @param dy The number of rows to drop the piece
   */
  public hardDown(ctx: CanvasRenderingContext2D, dy: number) {
    this.clear(ctx)
    this.row += dy - 1
    this.draw(ctx)
  }

  /**
   * Rotate a piece, possibly nudging it (to allow kicking off the walls)
   * and redraw it.
   *
   * @param ctx The drawing context
   * @param nudge The amount to possibly move the piece left/right
   */
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

  /**
   * Get a random type of piece.
   */
  public static getRandomType(): TetrominoType {
    return Math.floor(Math.random() * 7) + 1
  }

  /**
   * Create a new, random Piece instance.
   *
   * @param boardWidth The width of the board.
   * @param size The size of a board square in px.
   */
  public static randomPiece(boardWidth: number, size: number): Piece {
    const newType = Piece.getRandomType()
    return new Piece(
      newType,
      boardWidth,
      size
    )
  }
  
  /**
   * Fill a piece with the given color.
   *
   * @param ctx The drawing context
   * @param fillstyle The color to fill the piece with.
   */
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
  
  /**
   * Clear a piece from the board by drawing it as white.
   *
   * @param ctx The drawing context
   */
  private clear(ctx: CanvasRenderingContext2D) {
    this.fill(ctx, "white")
  }
}