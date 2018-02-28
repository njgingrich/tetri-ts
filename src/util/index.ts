import { Colors } from './color'
import { Piece } from '../model/piece'

export function addClass(node: HTMLElement, classes: string) {
  if (node.className) {
    node.className += " " + classes
  } else {
    node.className = classes
  }
}

export function drawSquare(x: number, y: number, ctx: CanvasRenderingContext2D, size: number) {
  ctx.fillRect(x * size, y * size, size, size)
  const ss = ctx.strokeStyle
  ctx.strokeStyle = "#222222"
  ctx.strokeRect(x * size, y * size, size, size)
  ctx.strokeStyle = ss
}

export function clearNextPiece(ctx: CanvasRenderingContext2D, p: Piece) {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      ctx.fillStyle = "white"
      ctx.fillRect(c * p.size, r * p.size, p.size, p.size)
    }
  }
}

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