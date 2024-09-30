function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export const getRandomBackground = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 120) % 360;
  const background = {
    gradient: `linear-gradient(125deg, hsl(${hue1}, 50%, 70%), hsl(${hue2}, 50%, 70%)) `,
    shadow: hslToHex(hue1, 70, 80), 
    blobGradient: `radial-gradient(circle at 50% 50%, hsl(${hue1}, 70%, 80%), hsl(${hue2}, 70%, 85%))`
  };
  return background;
};