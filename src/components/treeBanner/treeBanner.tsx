import { useEffect, useRef, useState } from "react";
import bannerImage from "../../assets/images/treeBanner.jpg";
import "./treeBanner.css";

type TreeBannerProps = {
  onShake: () => void;
};

const shakeCooldown = 3000;

const TreeBanner = ({ onShake }: TreeBannerProps) => {
  const [isShaking, setIsShaking] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const cooldownTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(cooldownTimeoutRef.current), []);

  const handleClick = () => {
    if (isCoolingDown) return;
    setIsShaking(true);
    setIsCoolingDown(true);
    cooldownTimeoutRef.current = window.setTimeout(
      () => setIsCoolingDown(false),
      shakeCooldown,
    );
    onShake();
  };

  return (
    <button
      type="button"
      className={
        isCoolingDown
          ? "tree-banner tree-banner-cooling fade-in"
          : "tree-banner fade-in"
      }
      title={isCoolingDown ? undefined : "Shake"}
      onClick={handleClick}
    >
      <img
        className={isShaking ? "tree-banner-image tree-banner-shaking" : "tree-banner-image"}
        src={bannerImage}
        alt="Autumn tree canopy"
        onAnimationEnd={() => setIsShaking(false)}
      />
    </button>
  );
};

export default TreeBanner;
