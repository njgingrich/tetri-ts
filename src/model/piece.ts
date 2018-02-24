import { TetrominoType, Shape, Shapes } from './shape'
import { Colors } from './color'
import { drawSquare } from '../util'

export class Piece {
  type: TetrominoType
  rotation: number
  shape: Shape
  row: number
  col: number
  boardWidth: number
  boardHeight: number
  color: string
  ctx: CanvasRenderingContext2D
  size: number
  collides: Function
  setOnBoard: Function

  constructor(type: TetrominoType,
              boardWidth: number,
              collides: Function,
              setOnBoard: Function,
              ctx: CanvasRenderingContext2D,
              size: number) {

    this.type = type
    this.color = Colors[this.type]
    this.rotation = 0
    this.shape = Shapes[this.type][this.rotation]

    this.row = -2 // y
    this.col = (boardWidth / 2) - Math.ceil(this.shape.length / 2); // x
    this.ctx = ctx
    this.size = size
    this.boardWidth = boardWidth
    this.collides = collides
    this.setOnBoard = setOnBoard
  }

  public draw() {
    this.fill(Colors[this.type])
  }

  public clear() {
    this.fill("white")
  }

  public left() {
    if (this.collides(this, -1, 0, this.shape)) {
      return
    }

    this.clear()
    this.col--
    this.draw()
  }

  public right() {
    if (this.collides(this, 1, 0, this.shape)) {
      return
    }

    this.clear()
    this.col++
    this.draw()
  }

  public down(): Piece | boolean {
    if (this.collides(this, 0, 1, this.shape)) {
      if (this.set()) return true
      return this.randomPiece()
    }

    this.clear()
    this.row++
    this.draw()
    return false
  }

  public rotate() {
    const nextRotation = Shapes[this.type][(this.rotation + 1) % 4]
    let nudge = 0

    if (this.collides(this, 0, 0, nextRotation)) {
      nudge = this.col > this.boardWidth / 2 ? -1 : 1
    }


    if (this.collides(this, nudge, 0, nextRotation)) {
      return
    }

    this.clear()
    this.col += nudge
    this.rotation = (this.rotation + 1) % 4
    this.shape = Shapes[this.type][this.rotation]
    this.draw()
  }
  
  public set() {
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape.length; c++) {
        if (!this.shape[r][c]) continue

        if (this.row + r < 0) {
          console.log("You lose")
          return
        }

        this.setOnBoard(this.row + r, this.col + c, this.type)
      }
    }
  }

  public static getRandomType(): number {
    return Math.floor(Math.random() * 7) + 1
  }

  private randomPiece(): Piece {
    return new Piece(Piece.getRandomType(),
                     this.boardWidth,
                     this.collides,
                     this.setOnBoard,
                     this.ctx,
                     this.size)
  }
  
  private fill(fillstyle: string) {
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape.length; c++) {
        let cell = this.shape[r][c]
        if (cell > 0) {
          this.ctx.fillStyle = fillstyle
          drawSquare(this.col + c, this.row + r, this.ctx, this.size)
        }
      }
    }
  }
}