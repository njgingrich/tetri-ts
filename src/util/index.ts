import { Colors } from './color'
import { Piece } from '../model/piece'

/**
 * Add one or more classes to an HTMLElement.
 *
 * @param node The node to add a class to.
 * @param classes The string of classes to add.
 */
export function addClass(node: HTMLElement, classes: string) {
  if (node.className) {
    node.className += " " + classes
  } else {
    node.className = classes
  }
}

/**
 * Draw a square on the canvas. Each piece is made up of several squares.
 *
 * @param x The x position on the canvas
 * @param y The y position on the canvas
 * @param ctx The drawing context of the canvas
 * @param size The size of a board square, in px.
 */
export function drawSquare(x: number, y: number, ctx: CanvasRenderingContext2D, size: number) {
  ctx.fillRect(x * size, y * size, size, size)
  const ss = ctx.strokeStyle
  ctx.strokeStyle = "#222222"
  ctx.strokeRect(x * size, y * size, size, size)
  ctx.strokeStyle = ss
}

/**
 * Remove the previous "next piece" so the new piece can be drawn.
 *
 * @param ctx The drawing context
 * @param p The piece to clear
 */
export function clearNextPiece(ctx: CanvasRenderingContext2D, p: Piece) {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      ctx.fillStyle = "white"
      ctx.fillRect(c * p.size, r * p.size, p.size, p.size)
    }
  }
}

/**
 * Draw the next piece that is upcoming on the board grid.
 *
 * @param ctx The drawing context
 * @param p The piece to draw
 */
export function drawNextPiece(ctx: CanvasRenderingContext2D, p: Piece) {
  const fillStyle = Colors[p.type]
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      if (p.shape[r] && p.shape[r][c]) {
        if (p.shape[r][c] > 0) {
          ctx.fillStyle = fillStyle
          drawSquare(c, r, ctx, p.size)
        }
      }
    }
  }
}