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