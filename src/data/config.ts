/**
 * Single source of truth — tinemaher.com
 * All personal data, projects, and social links. Components must pull from here.
 */

const SITE_URL = "https://tinemaher.com";

export const site = {
  name: "tinemaher.com",
  url: SITE_URL,
  description:
    "Tine Maher — AI ecosystems, hardware, Webflow. Portfolio and projects.",
} as const;

export const person = {
  name: "Tine Maher",
  role: "Technologist & Builder",
  bio: "Focused on AI ecosystems, hardware, and high-quality web experiences. Webflow development, design systems, and scalable digital products.",
  expertise: [
    "AI Ecosystems",
    "Hardware",
    "Webflow",
    "Webflow SEO & AEO",
    "Design Systems",
  ] as const,
  /** For JSON-LD: knowsAbout, schema.org */
  knowsAbout: [
    "AI Ecosystems",
    "Hardware",
    "Webflow",
    "Webflow SEO",
    "Design Systems",
    "Interactive & Motion Design",
  ] as const,
} as const;

export const projects = [
  {
    id: "ar-o1",
    name: "Ar-o1",
    tagline: "", // Ar-o1 vision — to be filled
    url: "", // when available
    description: "Current focus project.",
  },
  {
    id: "thewall",
    name: "The Wall",
    tagline: "Webflow Agency for Design, Development & Growth",
    url: "https://thewall.design",
    description:
      "Certified Webflow agency: branding, Webflow development, CRO, AI workflows, and long-term strategy.",
  },
] as const;

export const social: readonly { label: string; url: string; rel: string }[] = [
  { label: "LinkedIn", url: "", rel: "me" },
  { label: "X / Twitter", url: "", rel: "me" },
  { label: "GitHub", url: "", rel: "me" },
];

/** sameAs for JSON-LD — add canonical profile URLs when available */
export const sameAs: string[] = [
  // "https://linkedin.com/in/tinemaher",
  // "https://twitter.com/...",
  "https://thewall.design",
];

/** alumniOf for JSON-LD — education/org affiliations if desired */
export const alumniOf: string[] = [
  // e.g. "https://..."
];

export type SiteConfig = typeof site;
export type PersonConfig = typeof person;
export type ProjectsConfig = typeof projects;
export type SocialConfig = typeof social;
