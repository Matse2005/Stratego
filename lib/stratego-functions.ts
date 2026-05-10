export function getTextColor(backgroundColor: string) {
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(backgroundColor) ?? ["", "ff", "ff", "ff"]
  const r = parseInt(rgb[1], 16)
  const g = parseInt(rgb[2], 16)
  const b = parseInt(rgb[3], 16)
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return lum < 128 ? "white" : "black"
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}