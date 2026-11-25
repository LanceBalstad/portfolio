import type { ReactNode } from "react";
import "./card.css";

type CardProps = {
  title: string;
  className?: string;
  linkLabel?: string;
  onClick: () => void;
  children?: ReactNode;
};

const Card = ({
  title,
  className,
  linkLabel,
  onClick,
  children,
}: CardProps) => {
  return (
    <button
      type="button"
      className={className ? `card ${className}` : "card"}
      onClick={onClick}
    >
      <span className="card-content">
        <span className="card-title">{title}</span>
        <span className="card-body">{children}</span>
        <span className="card-link">{linkLabel} →</span>
      </span>
    </button>
  );
};

export default Card;
