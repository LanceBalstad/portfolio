import { useState } from "react";
import "./home.css";
import Header from "../components/header/header";
import Intro from "../components/intro/intro";
import HandsOnExperience from "../components/handsOnExperience/handsOnExperience";
import PersonalInformation from "../components/personalInformation/personalInformation";
import Footer from "../components/footer/footer";
import FallingLeaves from "../components/fallingLeaves/fallingLeaves";
import { dropLeaves } from "../components/fallingLeaves/leafStore";
import TreeBanner from "../components/treeBanner/treeBanner";
import CardModal from "../components/cardModal/cardModal";
import { cards } from "../data/cards";
import type { CardId } from "../data/cards";

const Home = () => {
  const [openCardId, setOpenCardId] = useState<CardId | null>(null);
  const openCard = openCardId ? cards[openCardId] : null;

  return (
    <div className="home-body">
      <Header onOpenCard={setOpenCardId} />
      <TreeBanner onShake={() => dropLeaves(5 + Math.floor(Math.random() * 6))} />
      <div className="home-content">
        <FallingLeaves />
        <Intro />
        <HandsOnExperience onOpenCard={setOpenCardId} />
        <PersonalInformation onOpenCard={setOpenCardId} />
        <Footer />
      </div>
      <CardModal
        open={openCard !== null}
        title={openCard?.title ?? ""}
        onClose={() => setOpenCardId(null)}
      >
        {openCard?.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </CardModal>
    </div>
  );
};

export default Home;
