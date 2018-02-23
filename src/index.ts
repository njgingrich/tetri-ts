import { Board } from './model/board'
import { TetrominoType } from './model/shape';

class Tetris {
  board: Board
  step: number
  lastTime: number
  container: HTMLCanvasElement
  newPiece: boolean

  constructor(container: HTMLCanvasElement) {
    this.container = container
    this.board = new Board(this.container)
    this.step = 1
    this.lastTime = 0
    this.newPiece = true
  }

  public start() {
    requestAnimationFrame(this.gameLoop.bind(this))
  }

  private getInput() {
    
  }

  private gameLoop(timestamp: any) {
    if (timestamp < this.lastTime + (1000 / this.step)) {
      requestAnimationFrame(this.gameLoop.bind(this))
      return
    }
    this.lastTime = timestamp
    if (this.newPiece) {
      this.board.setActivePiece(TetrominoType.SQUARE)
      this.newPiece = false
    }

    this.board.draw()
    this.board.drawPiece()
    
    requestAnimationFrame(this.gameLoop.bind(this))
  }
}

const container = document.getElementById("game") as HTMLCanvasElement
const game = new Tetris(container)
game.start()