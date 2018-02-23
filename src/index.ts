import { Board } from './model/board'
import { TetrominoType } from './model/shape';

class Tetris {
  board: Board
  step: number
  lastTime: number
  container: HTMLCanvasElement

  constructor(container: HTMLCanvasElement) {
    this.container = container
    this.board = new Board(this.container)
    this.step = 1
    this.lastTime = 0
  }

  public start() {
    this.board.insertShape(TetrominoType.T)
    requestAnimationFrame(this.gameLoop.bind(this))
  }

  private gameLoop(timestamp: any) {
    if (timestamp < this.lastTime + (1000 / this.step)) {
      requestAnimationFrame(this.gameLoop.bind(this))
      return
    }
    this.lastTime = timestamp

    this.board.draw()
    this.board.shiftDown()
    requestAnimationFrame(this.gameLoop.bind(this))
  }

  private createBoard() {

  }
}

const container = document.getElementById("game") as HTMLCanvasElement
const game = new Tetris(container)
game.start()