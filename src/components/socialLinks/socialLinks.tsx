import type { ReactNode } from "react";
import EmailIcon from "../../assets/icons/emailIcon";
import GithubIcon from "../../assets/icons/githubIcon";
import LinkedInIcon from "../../assets/icons/linkedInIcon";
import FigmaIcon from "../../assets/icons/figmaIcon";
import "./socialLinks.css";

type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

const links: SocialLink[] = [
  { label: "Email", href: "mailto:you@example.com", icon: <EmailIcon /> },
  { label: "GitHub", href: "https://github.com/", icon: <GithubIcon /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: <LinkedInIcon /> },
  { label: "Figma", href: "https://www.figma.com/", icon: <FigmaIcon /> },
];

const SocialLinks = () => {
  return (
    <ul className="social-links">
      {links.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            {...(href.startsWith("mailto:")
              ? {}
              : { target: "_blank", rel: "noreferrer" })}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
