export type CardId =
  | "experience"
  | "project1"
  | "project2"
  | "education"
  | "curious";

type CardInfo = {
  title: string;
  paragraphs: string[];
};

const loremParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
];

export const cards: Record<CardId, CardInfo> = {
  experience: { title: "Experience", paragraphs: loremParagraphs },
  project1: { title: "Morning Mini", paragraphs: loremParagraphs },
  project2: { title: "Glacial Retrievers", paragraphs: loremParagraphs },
  education: { title: "Education", paragraphs: loremParagraphs },
  curious: { title: "Curious About How I Work?", paragraphs: loremParagraphs },
};
