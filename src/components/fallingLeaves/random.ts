export const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

export const pickRandom = <T>(items: T[]) =>
  items[Math.floor(Math.random() * items.length)];
