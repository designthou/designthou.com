function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateGradient(seed: string) {
  const hash = hashString(seed);

  const hue1 = hash % 360;
  const hue2 = (hue1 + 40 + (hash % 60)) % 360;

  const color1 = `hsl(${hue1}, 65%, 70%)`;
  const color2 = `hsl(${hue2}, 65%, 80%)`;

  const angle = hash % 360;

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

export { generateGradient };
