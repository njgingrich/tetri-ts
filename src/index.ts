import { Board } from './model/board'

class Tetris {
  board: Board

  constructor() {
    this.board = new Board()
  }

  public start() {
    this.board.draw()
  }

  private createBoard() {

  }
}

const game = new Tetris()
game.start()