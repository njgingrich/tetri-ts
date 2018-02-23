import { TetrominoType, Shape, Shapes, Offset } from './shape'
import { addClass } from '../util'

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
  
  constructor(container: HTMLCanvasElement, width = 10, height = 22) {
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

        this.ctx.fillStyle = cell > 0 ? "red" : "white"
        this.drawMino(c, r)
      }
      
    }
  }

  private drawMino(x: number, y: number) {
    this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
    const ss = this.ctx.strokeStyle
    this.ctx.strokeStyle = "#222222"
    this.ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
    this.ctx.strokeStyle = ss
  }

  public insertShape(shape: TetrominoType, rotation: number = 0) {
    const hOffset = ((this.width / 2) - 2)
    const t = Shapes[shape][rotation]
    const offset = Offset[shape][rotation]

    for (let row = 0; row < 5; row++) {
      for (let i = 0; i < 5; i++) {
        let offsetRow = row + offset[1]
        let offsetCell = i + offset[0]

        if (offsetRow < 5 && offsetCell < 5) {
          this.grid[row][i + hOffset] = t[offsetRow][offsetCell];
        }
      }
    }
  }

  public shiftDown() {
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