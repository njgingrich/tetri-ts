import { Board } from './model/board'
import { Piece } from './model/piece'
import { TetrominoType } from './model/shape';
import { Keys } from './util/keys';
import { Backgrounds } from './util/color';

class Tetris {
  board: Board
  width: number
  height: number
  tileSize: number
  onDeck: Piece | null
  nextPiece: Piece
  nextPieceContainer: HTMLCanvasElement
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
    this.width = 10
    this.height = 20
    this.tileSize = 32
    this.board = new Board(this.container, this.width, this.height, this.tileSize)
    this.onDeck = null
    this.nextPiece = Piece.randomPiece(this.width, this.tileSize)
    this.levelEl = document.getElementById("level") as HTMLElement
    this.linesEl = document.getElementById("lines") as HTMLElement
    this.scoreEl = document.getElementById("score") as HTMLElement
    this.nextPieceContainer = document.getElementById("nextpiece") as HTMLCanvasElement
    this.nextPieceContainer.width = (4 * this.tileSize)
    this.nextPieceContainer.height = (4 * this.tileSize)
    this.paused = false
    this.gameOver = false
    this.level = 0
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
    this.board.activePiece = this.nextPiece
    this.nextPiece = Piece.randomPiece(this.width, this.tileSize)
    this.drawNextPiece(this.nextPiece)
    this.raf = requestAnimationFrame(this.gameLoop.bind(this))
  }

  private getInput() {
    function pause(this: any) {
      this.paused = !this.paused
      if (this.paused) {
        this.pauseGame()
      } else {
        this.unpauseGame()
      }
    }

    document.body.addEventListener("keydown", (e) => {
      this.board.getInput(e)
      if (e.keyCode === Keys.Q) {
        pause.call(this)
      }
    }, false)
    const pauseButton = document.getElementById("btn-pause") as HTMLElement
    const restartButton = document.getElementById("btn-restart") as HTMLElement
    const playAgainButton = document.getElementById("btn-playagain") as HTMLElement

    pauseButton.addEventListener("click", pause.bind(this))

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
    if (this.onDeck) {
      this.drawNextPiece(this.onDeck)
    }
    this.board.draw()
    const newPiece = this.board.movePieceDown()

    if (newPiece === true) {
      this.gameOver = true
      this.paused = true
    }
    if (newPiece instanceof Piece) {
      this.onDeck = newPiece
    }
  }

  private update() {
    const linesCleared = this.board.clearLines()
    this.lines += linesCleared
    this.linesEl.textContent = `${this.lines}`

    this.score += this.getScoreForLines(linesCleared)
    this.scoreEl.textContent = `${this.score}`

    if (this.shouldIncreaseLevel()) {
      this.level++
      this.gravity = this.gravity - 4
      this.updateBackground()
    }
    this.levelEl.textContent = `${this.level}`
  }

  private drawNextPiece(toDraw: Piece) {
    const ctx = this.nextPieceContainer.getContext('2d') as CanvasRenderingContext2D
    this.board.activePiece = this.nextPiece
    this.nextPiece.clearNextPiece(ctx)
    this.nextPiece = toDraw
    this.onDeck = null
    this.nextPiece.drawNextPiece(ctx)
  }

  private updateBackground() {
    document.body.style.backgroundColor = Backgrounds[this.level]
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
    this.level = 0
    this.gravity = 40

    this.board.reset()
    this.updateBackground()
    this.raf = requestAnimationFrame(this.gameLoop.bind(this))
  }

  // NES scoring
  private getScoreForLines(lines: number): number {
    const multipliers = [0, 40, 100, 300, 1200]
    return multipliers[lines] * (this.level + 1)
  }

  private shouldIncreaseLevel(): boolean {
    if (this.level === 10) return false // max level
    return (this.lines >= (this.level + 1) * 10)
  }
}

const container = document.getElementById("game") as HTMLCanvasElement
const game = new Tetris(container)
game.start()