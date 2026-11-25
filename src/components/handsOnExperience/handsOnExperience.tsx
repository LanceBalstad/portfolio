import Card from "../card/card";
import { cards } from "../../data/cards";
import type { CardId } from "../../data/cards";
import morningMini from "../../assets/images/morningMini.jpg";
import glacialRetrievers from "../../assets/images/glacialRetrievers.jpg";
import "./handsOnExperience.css";

type HandsOnExperienceProps = {
  onOpenCard: (id: CardId) => void;
};

const jobs = [
  {
    role: "Software Developer | RDO Equipment Co.",
    dates: "June 2024 – Present",
    location: "Fargo, ND",
  },
  {
    role: "Software Test Engineer Intern | Bell Bank",
    dates: "May 2023 – May 2024",
    location: "Fargo, ND",
  },
];

const projects: {
  id: CardId;
  image: string;
  imageAlt: string;
  summary: string;
}[] = [
  {
    id: "project1",
    image: morningMini,
    imageAlt: "Morning Mini crossword puzzle",
    summary:
      "Full-Stack mini crossword website with autonomous Rust/WebAssembly puzzle generation pipeline with AI-generated clues and cloud automation to publish new puzzles daily.",
  },
  {
    id: "project2",
    image: glacialRetrievers,
    imageAlt: "Glacial Retrievers website",
    summary:
      "Developed a cross-platform desktop application using Tauri, React, and Rust to organize developer notes linked to Azure DevOps work items.",
  },
];

const HandsOnExperience = ({ onOpenCard }: HandsOnExperienceProps) => {
  return (
    <section className="hands-on fade-in">
      <Card
        title={cards.experience.title}
        className="hands-on-experience fade-in"
        linkLabel="View More"
        onClick={() => onOpenCard("experience")}
      >
        {jobs.map(({ role, dates, location }) => (
          <span key={role}>
            <span>{role}</span>
            <span>{dates}</span>
            <span>{location}</span>
          </span>
        ))}
      </Card>
      {projects.map(({ id, image, imageAlt, summary }) => (
        <Card
          key={id}
          title={cards[id].title}
          className={`hands-on-${id} fade-in`}
          linkLabel="View More"
          onClick={() => onOpenCard(id)}
        >
          <img className="hands-on-image" src={image} alt={imageAlt} />
          <span>{summary}</span>
        </Card>
      ))}
    </section>
  );
};

export default HandsOnExperience;
