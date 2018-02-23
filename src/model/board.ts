import { TetrominoType, Shape, Shapes, Offset } from './shape'
import { addClass } from '../util'

// For now, equivalent to number[][] but may introduce stricter typing
// i.e. [22][10], 22 rows of width 10
export interface BoardGrid extends Array<Array<number>> {}

export class Board {
  grid: BoardGrid
  width: number
  height: number
  
  constructor(width = 10, height = 22) {
    this.width = width
    this.height = height

    this.grid = this.initGrid()
  }

  public draw() {
    const oldgame = document.getElementById("game")
    if (oldgame) document.body.removeChild(oldgame)
    const container = document.createElement('div')
    container.id = "game"
    addClass(container, "container")

    for (let r = 0; r < this.grid.length; r++) {
      let row = this.grid[r]
      let rowEl = document.createElement('div')
      addClass(rowEl, "row")

      for (let ix of row) {
        const cell = document.createElement('div')
        const minoName = ix > 0 ? TetrominoType[ix].toLowerCase() : ""

        addClass(cell, `cell ${ix > 0 ? "tetromino" : ""} ${minoName}`)
        rowEl.appendChild(cell)
      }

      container.appendChild(rowEl)
    }

    document.body.appendChild(container)
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