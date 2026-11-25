import { useCallback, useEffect, useRef, useState } from "react";
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

const spawnInterval = 5000;

const useFallingLeaves = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const nextIdRef = useRef(0);

  const dropLeaves = useCallback((count: number) => {
    const newLeaves = Array.from({ length: count }, () => ({
      id: nextIdRef.current++,
      Icon: pickRandom(leafIcons),
      color: pickRandom(leafColors),
      left: randomBetween(2, 96),
      scale: randomBetween(1, 2),
    }));
    setLeaves((current) => [...current, ...newLeaves]);
  }, []);

  const removeLeaf = useCallback((id: number) => {
    setLeaves((current) => current.filter((leaf) => leaf.id !== id));
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timeoutId: number;

    const scheduleLeaf = (delay: number) => {
      timeoutId = window.setTimeout(() => {
        if (!document.hidden) dropLeaves(1);
        scheduleLeaf(spawnInterval * randomBetween(0.7, 1.3));
      }, delay);
    };

    scheduleLeaf(1000);
    return () => window.clearTimeout(timeoutId);
  }, [dropLeaves]);

  return { leaves, dropLeaves, removeLeaf };
};

export default useFallingLeaves;
