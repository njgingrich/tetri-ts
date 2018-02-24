import { TetrominoType, Shape, Shapes } from './shape'
import { addClass, drawSquare } from '../util'
import { Colors } from './color'
import { Piece } from './piece';
import { Keys } from './keys'

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
  
  constructor(container: HTMLCanvasElement, width = 10, height = 20) {
    this.width = width
    this.height = height
    this.container = container
    this.ctx = this.container.getContext('2d') as CanvasRenderingContext2D

    this.tileSize = 32
    this.container.width = (this.width * this.tileSize)
    this.container.height = (this.height * this.tileSize)
    this.grid = this.initGrid()
  }

  public draw() {
    for (let r = 0; r < this.height; r++) {
      let row = this.grid[r]
      
      for (let c = 0; c < this.width; c++) {
        let cell = row[c]

        this.ctx.fillStyle = cell > 0 ? Colors[cell] : "white"
        drawSquare(c, r, this.ctx, this.tileSize)
      }
    }
  }

  public setActivePiece(shape: TetrominoType) {
    this.activePiece = new Piece(shape,
                                 this.width,
                                 this.collides.bind(this),
                                 this.setOnBoard.bind(this),
                                 this.ctx,
                                 this.tileSize)
  }

  public drawPiece() {
    this.activePiece.draw()
  }

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
  
  public getInput(e: KeyboardEvent) {
    if (e.keyCode === Keys.UP || e.keyCode === Keys.W) {
      this.activePiece.rotate()
    }
    if (e.keyCode === Keys.DOWN || e.keyCode === Keys.S) {
      this.activePiece.down()
    }
    if (e.keyCode === Keys.LEFT || e.keyCode === Keys.A) {
      this.activePiece.left()
    }
    if (e.keyCode === Keys.RIGHT || e.keyCode === Keys.D) {
      this.activePiece.right()
    }
  }

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

  private setOnBoard(row: number, col: number, type: TetrominoType) {
    this.grid[row][col] = type
  }
  
  private collides(piece: Piece, dx: number, dy: number, nextShape: Shape) {
    for (let r = 0; r < nextShape.length; r++) {
      for (let c = 0; c < nextShape.length; c++) {
        let cell = nextShape[r][c]
        if (cell === 0) continue

        let x = piece.col + c + dx
        let y = piece.row + r + dy
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