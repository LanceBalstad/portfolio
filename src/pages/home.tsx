import { useState } from "react";
import "./home.css";
import bannerImage from "../assets/images/treeBanner.jpg";
import Header from "../components/header/header";
import Intro from "../components/intro/intro";
import HandsOnExperience from "../components/handsOnExperience/handsOnExperience";
import PersonalInformation from "../components/personalInformation/personalInformation";
import Footer from "../components/footer/footer";
import CardModal from "../components/cardModal/cardModal";
import { cards } from "../data/cards";
import type { CardId } from "../data/cards";

const Home = () => {
  const [openCardId, setOpenCardId] = useState<CardId | null>(null);
  const openCard = openCardId ? cards[openCardId] : null;

  return (
    <div className="home-body">
      <Header onOpenCard={setOpenCardId} />
      <img className="home-banner fade-in" src={bannerImage} alt="Autumn tree canopy" />
      <Intro />
      <HandsOnExperience onOpenCard={setOpenCardId} />
      <PersonalInformation onOpenCard={setOpenCardId} />
      <Footer />
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
