import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import {
  dropLeaves,
  getLeaves,
  removeLeaf,
  subscribeToLeaves,
} from "./leafStore";
import type { Leaf } from "./leafStore";
import {
  createLeafMotion,
  leafTransform,
  startY,
  stepLeafMotion,
} from "./leafMotion";
import type { LeafMotion } from "./leafMotion";
import { randomBetween } from "./random";
import "./fallingLeaves.css";

const spawnInterval = 4000;

type AnimatedLeaf = {
  element: HTMLDivElement;
  motion: LeafMotion;
  scale: number;
};

type FallingLeafProps = {
  leaf: Leaf;
  onMount: (leaf: Leaf, element: HTMLDivElement) => () => void;
};

const FallingLeaf = ({ leaf, onMount }: FallingLeafProps) => {
  const { Icon, color, left, scale } = leaf;

  const attach = useCallback(
    (element: HTMLDivElement | null) =>
      element ? onMount(leaf, element) : undefined,
    [leaf, onMount],
  );

  return (
    <div
      ref={attach}
      className="falling-leaf"
      style={{
        left: `${left}%`,
        transform: leafTransform(0, startY, 0, scale),
      }}
    >
      <Icon fill={color} />
    </div>
  );
};

const FallingLeaves = () => {
  const leaves = useSyncExternalStore(subscribeToLeaves, getLeaves);
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedLeavesRef = useRef(new Map<number, AnimatedLeaf>());
  const hasLeaves = leaves.length > 0;

  const trackLeaf = useCallback((leaf: Leaf, element: HTMLDivElement) => {
    const animatedLeaves = animatedLeavesRef.current;
    animatedLeaves.set(leaf.id, {
      element,
      motion: createLeafMotion(),
      scale: leaf.scale,
    });
    return () => {
      animatedLeaves.delete(leaf.id);
    };
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
  }, []);

  /* Moves every leaf from one shared animation frame loop, running only while leaves exist. */
  useEffect(() => {
    const container = containerRef.current;
    if (!hasLeaves || !container) return;

    const animatedLeaves = animatedLeavesRef.current;
    let previousTime: number | null = null;
    let frameId = 0;

    const step = (time: number) => {
      const delta = Math.min((time - (previousTime ?? time)) / 1000, 0.05);
      previousTime = time;
      const bottom = container.clientHeight + 40;

      for (const [id, { element, motion, scale }] of animatedLeaves) {
        stepLeafMotion(motion, delta);
        element.style.transform = leafTransform(
          motion.x,
          motion.y,
          motion.tilt,
          scale,
        );
        if (motion.y > bottom) {
          animatedLeaves.delete(id);
          removeLeaf(id);
        }
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [hasLeaves]);

  return (
    <div ref={containerRef} className="falling-leaves" aria-hidden="true">
      {leaves.map((leaf) => (
        <FallingLeaf key={leaf.id} leaf={leaf} onMount={trackLeaf} />
      ))}
    </div>
  );
};

export default FallingLeaves;
