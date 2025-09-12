import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Cross Lyrics",
  DESCRIPTION: "Christian worship lyrics collection.",
  EMAIL: "sureshedison77@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Christian worship lyrics collection.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "X (formerly Twitter)",
    HREF: "#",
  },
  {
    NAME: "GitHub",
    HREF: "#",
  },
  {
    NAME: "Website",
    HREF: "#",
  },
];
