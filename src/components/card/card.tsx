import type { ReactNode } from "react";
import "./card.css";

type CardProps = {
  title: string;
  className?: string;
  onClick: () => void;
  children?: ReactNode;
};

const Card = ({ title, className, onClick, children }: CardProps) => {
  return (
    <button
      type="button"
      className={className ? `card ${className}` : "card"}
      onClick={onClick}
    >
      <span className="card-content">
        <span className="card-title">{title}</span>
        {children}
      </span>
    </button>
  );
};

export default Card;
