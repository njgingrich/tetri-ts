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
    const container = document.createElement('div')
    container.className = container.className ? container.className += " container" : "container"

    for (let row of this.grid) {
      const rowEl = document.createElement('div')
      rowEl.className = rowEl.className ? rowEl.className += " row" : "row"

      for (let ix of row) {
        const cell = document.createElement('div')
        cell.className = cell.className ? cell.className += " cell" : "cell"
        rowEl.appendChild(cell)
      }

      container.appendChild(rowEl)
    }

    document.body.appendChild(container)
  }

  private initGrid(): BoardGrid {
    return Array(this.height).fill(Array(this.width).fill(0))
  }
}