import Card from "../card/card";
import TechStack from "../techStack/techStack";
import PlaceholderTextIcon from "../../assets/icons/placeholderTextIcon";
import { cards } from "../../data/cards";
import type { CardId } from "../../data/cards";
import "./personalInformation.css";

type PersonalInformationProps = {
  onOpenCard: (id: CardId) => void;
};

const PersonalInformation = ({ onOpenCard }: PersonalInformationProps) => {
  return (
    <section className="personal-info">
      <Card
        title={cards.aboutMe.title}
        className="personal-info-about"
        onClick={() => onOpenCard("aboutMe")}
      >
        <PlaceholderTextIcon />
        <PlaceholderTextIcon />
      </Card>
      <TechStack />
      <Card
        title={cards.curious.title}
        className="personal-info-curious"
        onClick={() => onOpenCard("curious")}
      >
        <PlaceholderTextIcon />
      </Card>
    </section>
  );
};

export default PersonalInformation;
