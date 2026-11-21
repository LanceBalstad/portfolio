import { cards } from "../../data/cards";
import type { CardId } from "../../data/cards";
import "./header.css";

type HeaderProps = {
  onOpenCard: (id: CardId) => void;
};

const navCards: CardId[] = ["aboutMe", "experience", "projects"];

const Header = ({ onOpenCard }: HeaderProps) => {
  return (
    <header className="header">
      <h1 className="header-name">Lance Balstad</h1>
      <nav className="header-nav">
        {navCards.map((id) => (
          <button key={id} type="button" onClick={() => onOpenCard(id)}>
            {cards[id].title}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
