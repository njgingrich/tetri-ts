import { Board } from './model/board'
import { Piece } from './model/piece'
import { TetrominoType } from './model/shape';

class Tetris {
  board: Board
  container: HTMLCanvasElement
  newPiece: boolean
  lines: number
  score: number


  limit: number
  lastFrameTimeMs: number
  maxFPS: number
  delta: number
  timestep: number
  fps: number
  framesThisSecond: number
  lastFpsUpdate: number
  gravity: number

  constructor(container: HTMLCanvasElement) {
    this.container = container
    this.board = new Board(this.container)
    this.newPiece = true
    this.lines = 0
    this.score = 0

    this.limit = 300
    this.lastFrameTimeMs = 0
    this.maxFPS = 60
    this.delta = 0
    this.timestep = 1000 / 60
    this.fps = 60
    this.framesThisSecond = 0
    this.lastFpsUpdate = 0
    this.gravity = 40
  }

  public start() {
    this.getInput()
    this.board.setActivePiece(Piece.getRandomType())
    requestAnimationFrame(this.gameLoop.bind(this))
  }

  private getInput() {
    document.body.addEventListener("keydown", this.board.getInput.bind(this.board), false)
  }

  private gameLoop(timestamp: any) {
    if (timestamp < this.lastFrameTimeMs + ((1000 / this.maxFPS) * this.gravity)) {
      requestAnimationFrame(this.gameLoop.bind(this))
      return
    }
    this.delta += timestamp - this.lastFrameTimeMs
    this.lastFrameTimeMs = timestamp

    if (timestamp > this.lastFpsUpdate + 1000) {
      this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps

      this.lastFpsUpdate = timestamp
      this.framesThisSecond = 0
    }

    this.framesThisSecond++
    let numUpdateSteps = 0
    while (this.delta >= this.timestep) {
      this.delta -= this.timestep
        if (++numUpdateSteps >= 240) {
          break
        }
    }
    this.draw()
    requestAnimationFrame(this.gameLoop.bind(this))
  }

  private draw() {
    this.board.draw()
    this.board.drawPiece()
    const newPiece = this.board.activePiece.down()
    this.lines += this.board.clearLines()
    if (newPiece instanceof Piece) this.board.activePiece = newPiece
  }
}

const container = document.getElementById("game") as HTMLCanvasElement
const game = new Tetris(container)
game.start()