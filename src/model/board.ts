import { TetrominoType, Shape, Shapes, Offset } from './shape'
import { addClass, drawSquare } from '../util'
import { Colors } from './color'
import { Piece } from './piece';

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
    this.activePiece = new Piece(shape, this.width, this.ctx, this.tileSize)
  }

  public drawPiece() {
    // const hOffset = ((this.width / 2) - 2)
    // const t = Shapes[shape][rotation]
    // const offset = Offset[shape][rotation]
    this.activePiece.draw()
  }

  public shiftBoardDown() {
    const bottomRow = this.grid[this.grid.length - 1].filter(el => el !== 0)
    const shouldNotShift = bottomRow.length > 0

    if (shouldNotShift) {
      return
    }

    let cells = []
    for (let c = 0; c < this.width; c++) {
      cells.push(0)
    }

    this.grid.pop()
    this.grid.unshift(cells)
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
}