import Card from "../card/card";
import TechStack from "../techStack/techStack";
import { cards } from "../../data/cards";
import type { CardId } from "../../data/cards";
import "./personalInformation.css";

type PersonalInformationProps = {
  onOpenCard: (id: CardId) => void;
};

const educationLines = [
  ["North Dakota State University,", "Fargo, ND"],
  ["Master of Science (M.S.)", "in Computer Science,", "May 2025"],
  ["Bachelor of Science (B.S.)", "in Computer Science,", "May 2024"],
];

const PersonalInformation = ({ onOpenCard }: PersonalInformationProps) => {
  return (
    <section className="personal-info">
      <Card
        title={cards.education.title}
        className="personal-info-education fade-in"
        onClick={() => onOpenCard("education")}
      >
        {educationLines.map((lines) => (
          <span key={lines[0]}>
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        ))}
      </Card>
      <TechStack />
      <Card
        title={cards.curious.title}
        className="personal-info-curious fade-in"
        linkLabel="View How I Work"
        onClick={() => onOpenCard("curious")}
      >
        <span>
          Click here if you're interested in how I design front end code with
          Figma, complex backend code, and work with others with high
          communication on the day-to-day of a fast moving work day.
        </span>
      </Card>
    </section>
  );
};

export default PersonalInformation;
