import { TetrominoType, Shape, Shapes } from './shape'
import { addClass, drawSquare } from '../util'
import { Colors } from '../util/color'
import { Piece } from './piece';
import { Keys } from '../util/keys'
import { GameEvent } from './event';

// For now, equivalent to number[][] but may introduce stricter typing
// i.e. [22][10], 22 rows of width 10
export interface BoardGrid extends Array<Array<number>> {}

export class Board {
  grid: BoardGrid
  width: number
  height: number
  container: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  tileSize: number // in px
  activePiece: Piece
  
  constructor(
    container: HTMLCanvasElement,
    width: number,
    height: number,
    tileSize: number
  ) {
    this.width = width
    this.height = height
    this.container = container
    this.ctx = this.container.getContext('2d') as CanvasRenderingContext2D

    this.tileSize = tileSize
    this.container.width = (this.width * this.tileSize)
    this.container.height = (this.height * this.tileSize)
    this.grid = this.initGrid()
  }

  /**
   * Draw the grid onto the canvas.
   */
  public draw() {
    for (let r = 0; r < this.height; r++) {
      let row = this.grid[r]
      
      for (let c = 0; c < this.width; c++) {
        let cell = row[c]

        this.ctx.fillStyle = cell > 0 ? Colors[cell] : "white"
        drawSquare(c, r, this.ctx, this.tileSize)
      }
    }
    this.activePiece.draw(this.ctx)
  }

  /**
   * Remove filled lines from the board and shift the remaining lines down,
   * refilling the top with empty lines.
   */
  public clearLines(): number {
    let numLines = 0

    for (let row = 0; row < this.height; row++) {
      let line = this.grid[row].filter(el => el === 0).length === 0

      if (line) {
        numLines++

        for (let r = row; r > 0; r--) {
          for (let c = 0; c < this.width; c++) {
            this.grid[r][c] = this.grid[r-1][c]
          }
        }
        for (let c = 0; c < this.width; c++) {
          this.grid[0][c] = 0
        }
      }
    }
    return numLines
  }
  
  /**
   * Returns true if the piece is stuck and a new piece should be created
   * @param event GameEvent
   */
  public handleEvent(event: GameEvent): boolean {
    switch (event) {
      case GameEvent.MOVE_LEFT: {
        if (!this.collides(-1, 0, this.activePiece.shape)) {
          this.activePiece.left(this.ctx)
        }
        break
      }
      case GameEvent.MOVE_RIGHT: {
        if (!this.collides(1, 0, this.activePiece.shape)) {
          this.activePiece.right(this.ctx)
        }
        break
      }
      case GameEvent.MOVE_DOWN: {
        if (this.collides(0, 1, this.activePiece.shape)) {
          return true
        }
        this.activePiece.down(this.ctx)
        break
      }
      case GameEvent.HARD_DOWN: {
        let dy = 1
        while (!this.collides(0, dy, this.activePiece.shape)) {
          dy++
        }
        this.activePiece.hardDown(this.ctx, dy)
        return true
      }
      case GameEvent.ROTATE: {
        const nextRotationIx = (this.activePiece.rotation + 1) % 4
        const nextRotation = Shapes[this.activePiece.type][nextRotationIx]
        let nudge = 0
    
        if (this.collides(0, 0, nextRotation)) {
          nudge = this.activePiece.col > this.width / 2 ? -1 : 1
        }
    
        if (this.collides(nudge, 0, nextRotation)) {
          break
        }

        this.activePiece.rotate(this.ctx, nudge)
        break
      }
      default: {
        return false
      }
    }
    return false
  }

  /**
   * Reset the board to its initial state, including a random new first piece.
   */
  public reset() {
    this.grid = this.initGrid()
    this.activePiece = Piece.randomPiece(this.width, this.tileSize)
  }

  /**
   * Initialize the grid with default values.
   */
  private initGrid(): BoardGrid {
    let rows = []
    for (let r = 0; r < this.height; r++) {
      let cells = []
      for (let c = 0; c < this.width; c++) {
        cells.push(0)
      }
      rows.push(cells)
    }

    return rows
  }

  /**
   * Shift a piece down - expose the behavior of the active piece.
   */
  public movePieceDown(): boolean {
    if (this.collides(0, 1, this.activePiece.shape)) {
      return true
    }
    this.activePiece.down(this.ctx)
    return false
  }

  /**
   * Set the piece into the board.
   */
  public lockPiece() {
    this.activePiece.set(this.setOnBoard.bind(this))
  }

  /**
   * Draw the piece, saving it into the board.
   *
   * @param row The row of the grid
   * @param col The column of the grid
   * @param type The type of piece to draw
   */
  private setOnBoard(row: number, col: number, type: TetrominoType) {
    this.grid[row][col] = type
  }
  
  /**
   * Check collision between the board and the active piece.
   *
   * @param dx The movement left/right
   * @param dy The movement down
   * @param nextShape The shape a piece would have on its next rotation.
   */
  private collides(dx: number, dy: number, nextShape: Shape) {
    for (let r = 0; r < nextShape.length; r++) {
      for (let c = 0; c < nextShape.length; c++) {
        let cell = nextShape[r][c]
        if (cell === 0) continue

        let x = this.activePiece.col + c + dx
        let y = this.activePiece.row + r + dy
        if (y >= this.height || x < 0 || x >= this.width) {
          return true
        }
        if (y < 0) continue
        if (this.grid[y][x]) {
          return true
        }
      }
    }
    return false
  }
}