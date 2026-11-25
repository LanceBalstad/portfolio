import { randomBetween } from "./random";

export const startY = -40;
const maxTilt = 30;

/* Smooth 1D value noise in [0, 1]: random values at whole steps, eased between. */
const createNoise = (frequency: number) => {
  const values: number[] = [];
  const valueAt = (index: number) => (values[index] ??= Math.random());

  return (time: number) => {
    const position = time * frequency;
    const index = Math.floor(position);
    const fraction = position - index;
    const eased = fraction * fraction * (3 - 2 * fraction);
    return valueAt(index) + (valueAt(index + 1) - valueAt(index)) * eased;
  };
};

export type LeafMotion = ReturnType<typeof createLeafMotion>;

export const createLeafMotion = () => ({
  swingRate: randomBetween(1.6, 2.4),
  swingSpeed: randomBetween(70, 110),
  fallSpeed: randomBetween(28, 42),
  windStrength: randomBetween(12, 50),
  swingRateNoise: createNoise(randomBetween(0.3, 0.5)),
  swingSizeNoise: createNoise(randomBetween(0.1, 0.2)),
  windNoise: createNoise(randomBetween(0.05, 0.1)),
  phase: Math.random() * Math.PI * 2,
  elapsed: 0,
  x: 0,
  y: startY,
  tilt: 0,
});

/* Advances a pendulum-style fall whose swing speed, swing size and wind drift wander randomly. */
export const stepLeafMotion = (motion: LeafMotion, delta: number) => {
  motion.elapsed += delta;

  const swingSize = Math.min(
    Math.max((motion.swingSizeNoise(motion.elapsed) - 0.2) / 0.5, 0),
    1,
  );
  const wind = (motion.windNoise(motion.elapsed) - 0.5) * 2 * motion.windStrength;
  motion.phase +=
    delta * motion.swingRate * (0.5 + motion.swingRateNoise(motion.elapsed));

  const swing = Math.cos(motion.phase);
  motion.x += delta * (motion.swingSpeed * swingSize * swing + wind);
  motion.y +=
    delta *
    motion.fallSpeed *
    (0.55 + swingSize * 0.9 * swing * swing + (1 - swingSize) * 0.25);
  motion.tilt = -maxTilt * swingSize * Math.sin(motion.phase);
};

export const leafTransform = (
  x: number,
  y: number,
  tilt: number,
  scale: number,
) => `translate(${x}px, ${y}px) rotate(${tilt}deg) scale(${scale})`;
