import { Board } from './model/board'
import { Piece } from './model/piece'
import { TetrominoType } from './model/shape';

class Tetris {
  board: Board
  container: HTMLCanvasElement
  levelEl: HTMLElement
  linesEl: HTMLElement
  scoreEl: HTMLElement
  level: number
  lines: number
  score: number
  paused: boolean
  gameOver: boolean
  raf: number

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
    this.levelEl = document.getElementById("level") as HTMLElement
    this.linesEl = document.getElementById("lines") as HTMLElement
    this.scoreEl = document.getElementById("score") as HTMLElement
    this.paused = false
    this.gameOver = false
    this.level = 1
    this.lines = 0
    this.score = 0
    this.raf = -1

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
    this.raf = requestAnimationFrame(this.gameLoop.bind(this))
  }

  private getInput() {
    document.body.addEventListener("keydown", this.board.getInput.bind(this.board), false)
    const pauseButton = document.getElementById("btn-pause") as HTMLElement
    const restartButton = document.getElementById("btn-restart") as HTMLElement
    const playAgainButton = document.getElementById("btn-playagain") as HTMLElement

    pauseButton.addEventListener("click", (e) => {
      this.paused = !this.paused
      if (this.paused) {
        this.pauseGame()
      } else {
        this.unpauseGame()
      }
    })

    restartButton.addEventListener("click", this.reset.bind(this))
    playAgainButton.addEventListener("click", this.reset.bind(this))
  }

  private gameLoop(timestamp: any) {
    if (this.gameOver) this.end()

    if (timestamp < this.lastFrameTimeMs + ((1000 / this.maxFPS) * this.gravity)) {
      this.raf = requestAnimationFrame(this.gameLoop.bind(this))
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
      this.update()
      this.delta -= this.timestep
        if (++numUpdateSteps >= 240) {
          break
        }
    }
    this.draw()
    this.raf = requestAnimationFrame(this.gameLoop.bind(this))
  }

  private draw() {
    this.board.draw()
    const newPiece = this.board.activePiece.down()
    console.log('new piece:', newPiece)

    if (newPiece === true) {
      this.gameOver = true
      this.paused = true
    }
    if (newPiece instanceof Piece) this.board.activePiece = newPiece
  }

  private update() {
    this.lines += this.board.clearLines()
    this.linesEl.textContent = `${this.lines}`
  }

  private pauseGame() {
    cancelAnimationFrame(this.raf)
    const overlay = document.getElementById("pause-overlay")
    if (overlay) overlay.style.display = "block"
  }

  private unpauseGame() {
    const overlay = document.getElementById("pause-overlay")
    if (overlay) overlay.style.display = "none"
    this.raf = requestAnimationFrame(this.gameLoop.bind(this))
  }

  private end() {
    const overlay = document.getElementById("overlay")
    if (overlay) overlay.style.display = "block"
  }

  private reset(e: MouseEvent) {
    cancelAnimationFrame(this.raf)
    const overlay = document.getElementById("overlay")
    if (overlay) overlay.style.display = "none"
    this.gameOver = false

    this.lines = 0
    this.score = 0
    this.level = 1
    this.gravity = 40

    this.board.reset(Piece.getRandomType())
    this.raf = requestAnimationFrame(this.gameLoop.bind(this))
  }
}

const container = document.getElementById("game") as HTMLCanvasElement
const game = new Tetris(container)
game.start()