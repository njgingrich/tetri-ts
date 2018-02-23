export function addClass(node: HTMLElement, classes: string) {
  if (node.className) {
    node.className += " " + classes
  } else {
    node.className = classes
  }
}