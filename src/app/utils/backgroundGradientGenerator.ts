export class BackgroundGradientGenerator {
  generateRandomGradient() {
  const colors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#2dd4bf', '#60a5fa', '#a855f7', '#ec4899'];

  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];

  return `linear-gradient(to bottom right, ${color1}, ${color2})`;
}

}
