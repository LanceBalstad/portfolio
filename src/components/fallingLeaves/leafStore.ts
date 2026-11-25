import type { ComponentType } from "react";
import Leaf1 from "../../assets/icons/leaf1";
import Leaf2 from "../../assets/icons/leaf2";
import Leaf3 from "../../assets/icons/leaf3";
import Leaf4 from "../../assets/icons/leaf4";
import Leaf5 from "../../assets/icons/leaf5";
import Leaf6 from "../../assets/icons/leaf6";
import Leaf7 from "../../assets/icons/leaf7";
import { pickRandom, randomBetween } from "./random";

type LeafIcon = ComponentType<{ fill: string }>;

export type Leaf = {
  id: number;
  Icon: LeafIcon;
  color: string;
  left: number;
  scale: number;
};

const leafIcons: LeafIcon[] = [Leaf1, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7];

const leafColors = [
  "#F0C552",
  "#F48A40",
  "#9F4B1D",
  "#E1CF40",
  "#ED9D3C",
  "#B5B145",
  "#D66721",
];

const maxLeaves = 200;

let leaves: Leaf[] = [];
let nextId = 0;
const listeners = new Set<() => void>();

const setLeaves = (nextLeaves: Leaf[]) => {
  leaves = nextLeaves;
  listeners.forEach((listener) => listener());
};

export const subscribeToLeaves = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getLeaves = () => leaves;

export const dropLeaves = (count: number) => {
  const room = Math.min(count, maxLeaves - leaves.length);
  if (room <= 0) return;

  const newLeaves = Array.from({ length: room }, () => ({
    id: nextId++,
    Icon: pickRandom(leafIcons),
    color: pickRandom(leafColors),
    left: randomBetween(2, 96),
    scale: randomBetween(1, 2),
  }));
  setLeaves([...leaves, ...newLeaves]);
};

export const removeLeaf = (id: number) => {
  setLeaves(leaves.filter((leaf) => leaf.id !== id));
};
