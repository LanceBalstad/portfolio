import Card from "../card/card";
import PlaceholderTextIcon from "../../assets/icons/placeholderTextIcon";
import { cards } from "../../data/cards";
import type { CardId } from "../../data/cards";
import "./handsOnExperience.css";

type HandsOnExperienceProps = {
  onOpenCard: (id: CardId) => void;
};

const sectionCards: { id: CardId; className: string }[] = [
  { id: "projects", className: "hands-on-projects" },
  { id: "experience", className: "hands-on-experience" },
  { id: "education", className: "hands-on-education" },
];

const HandsOnExperience = ({ onOpenCard }: HandsOnExperienceProps) => {
  return (
    <section className="hands-on">
      {sectionCards.map(({ id, className }) => (
        <Card
          key={id}
          title={cards[id].title}
          className={className}
          onClick={() => onOpenCard(id)}
        >
          <PlaceholderTextIcon />
          <PlaceholderTextIcon />
        </Card>
      ))}
    </section>
  );
};

export default HandsOnExperience;
