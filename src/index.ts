import { Board } from './model/board'
import { Piece } from './model/piece'
import { TetrominoType } from './model/shape'
import { Keys } from './util/keys'
import { Backgrounds } from './util/color'
import { Shapes } from './model/shape'
import { GameEvent } from './model/event'

class Tetris {
  board: Board
  width: number
  height: number
  tileSize: number
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

  queuedActions: GameEvent[]
  lastTick: number
  dt: number
  step: number
  needNewPiece: boolean

  constructor(container: HTMLCanvasElement) {
    this.container = container
    this.width = 10
    this.height = 20
    this.tileSize = 32
    this.board = new Board(this.container, this.width, this.height, this.tileSize)
    this.nextPiece = Piece.randomPiece(this.width, this.tileSize)
    this.levelEl = document.getElementById("level") as HTMLElement
    this.linesEl = document.getElementById("lines") as HTMLElement
    this.scoreEl = document.getElementById("score") as HTMLElement
    this.nextPieceContainer = document.getElementById("nextpiece") as HTMLCanvasElement
    this.nextPieceContainer.width = (4 * this.tileSize)
    this.nextPieceContainer.height = (4 * this.tileSize)
    this.paused = false
    this.level = 0
    this.lines = 0
    this.score = 0
    this.queuedActions = []
    this.dt = 0
    this.step = 1.0
    this.needNewPiece = false
  }

  public start() {
    this.getInput()
    this.board.activePiece = this.nextPiece
    this.nextPiece = Piece.randomPiece(this.width, this.tileSize)
    this.drawNextPiece(this.nextPiece)

    this.lastTick = performance.now()
    requestAnimationFrame(this.loop.bind(this))
  }

  private getInput() {
    document.body.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case Keys.A, Keys.LEFT: {
          this.queuedActions.push(GameEvent.MOVE_LEFT)
          break
        }
        case Keys.D, Keys.RIGHT: {
          this.queuedActions.push(GameEvent.MOVE_RIGHT)
          break
        }
        case Keys.W, Keys.UP: {
          this.queuedActions.push(GameEvent.ROTATE)
          break
        }
        case Keys.D, Keys.DOWN: {
          this.queuedActions.push(GameEvent.MOVE_DOWN)
          break
        }
        case Keys.SPACE: {
          this.queuedActions.push(GameEvent.HARD_DOWN)
          break
        }
        case Keys.Q: {
          if (this.paused) {
            this.queuedActions.push(GameEvent.UNPAUSE)
          } else {
            this.queuedActions.push(GameEvent.PAUSE)
          }
          break
        }
      }
    }, false)

    const pauseButton = document.getElementById("btn-pause") as HTMLElement
    const restartButton = document.getElementById("btn-restart") as HTMLElement
    const playAgainButton = document.getElementById("btn-playagain") as HTMLElement

    pauseButton.addEventListener("click", (e) => {
      if (this.paused) {
        this.queuedActions.push(GameEvent.PAUSE)
      } else {
        this.queuedActions.push(GameEvent.UNPAUSE)
      }
    }, false)
    restartButton.addEventListener("click", (e) => {
      this.queuedActions.push(GameEvent.RESTART)
    }, false)
    playAgainButton.addEventListener("click", (e) => {
      this.queuedActions.push(GameEvent.RESTART)
    })
  }

  private loop(time: any) {
    const now = performance.now()
    this.update((now - this.lastTick) / 1000.0)
    this.draw()
    this.lastTick = now
    requestAnimationFrame(this.loop.bind(this))
  }

  private draw() {
    this.board.draw()
    this.drawNextPiece(this.nextPiece)
  }

  private update(ticks: number) {
    const e = this.queuedActions.shift()
    if (e !== undefined) this.handleEvent(e)

    if (this.paused) return

    this.dt += ticks
    if (this.dt > this.step) {
      this.dt -= this.step
      this.needNewPiece = this.board.movePieceDown()
    }

    if (this.needNewPiece) {
      
      if (this.board.activePiece.isAtTop()) {
        this.queuedActions = Array.of(GameEvent.GAME_OVER)
        return
      }

      this.needNewPiece = false
      this.board.lockPiece()
      this.board.activePiece = this.nextPiece
      this.nextPiece = Piece.randomPiece(this.width, this.tileSize)
    }

    const linesCleared = this.board.clearLines()
    this.lines += linesCleared
    this.linesEl.textContent = `${this.lines}`

    this.score += this.getScoreForLines(linesCleared)
    this.scoreEl.textContent = `${this.score}`

    // if (this.shouldIncreaseLevel()) {
    //   this.level++
    //   this.gravity = this.gravity - 4
    //   this.updateBackground()
    // }
    // this.levelEl.textContent = `${this.level}`
  }

  private handleEvent(event: GameEvent) {
    switch (event) {
      case GameEvent.HARD_DOWN:
      case GameEvent.MOVE_DOWN:
      case GameEvent.MOVE_LEFT:
      case GameEvent.MOVE_RIGHT:
      case GameEvent.ROTATE: {
        this.board.handleEvent(event)
        break
      }
      case GameEvent.PAUSE: {
        this.pauseGame()
        break
      }
      case GameEvent.UNPAUSE: {
        this.unpauseGame()
        break
      }
      case GameEvent.RESTART: {
        this.reset()
        break
      }
      case GameEvent.GAME_OVER: {
        this.gameOver()
        break
      }
    }
  }

  private drawNextPiece(toDraw: Piece) {
    const ctx = this.nextPieceContainer.getContext('2d') as CanvasRenderingContext2D
    this.nextPiece.clearNextPiece(ctx)
    this.nextPiece.drawNextPiece(ctx)
  }

  private updateBackground() {
    document.body.style.backgroundColor = Backgrounds[this.level]
  }

  private pauseGame() {
    this.paused = true
    const overlay = document.getElementById("pause-overlay")
    if (overlay) overlay.style.display = "block"
  }

  private unpauseGame() {
    this.paused = false
    const overlay = document.getElementById("pause-overlay")
    if (overlay) overlay.style.display = "none"
    requestAnimationFrame(this.loop.bind(this))
  }

  private gameOver() {
    const overlay = document.getElementById("overlay")
    if (overlay) overlay.style.display = "block"
  }

  private reset() {
    const overlay = document.getElementById("overlay")
    if (overlay) overlay.style.display = "none"

    this.lines = 0
    this.score = 0
    this.level = 0

    this.board.reset()
    this.updateBackground()
    requestAnimationFrame(this.loop.bind(this))
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
