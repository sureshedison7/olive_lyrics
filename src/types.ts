export type Site = {
  TITLE: string;
  DESCRIPTION: string;
  EMAIL: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
};

export type Metadata = { 
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
}[];

export interface LyricsTypes {
  id: number;                  // Unique ID
  url: string;                 // Slug or unique identifier
  title: string;               // Song title
  lyrics: string;              // Full lyrics (with line breaks or markdown)
  chords?: string | null;      // Optional chords (inline or separate)
  description?: string | null; // Short description
  album?: string | null;       // Album name
  artist?: string | null;      // Artist name
  category?: string | null;    // Category (e.g., Worship, Gospel)
  pub_date?: string | null;    // Original published date (ISO string)
  mod_date: string;            // Last modified date (ISO string)
  key?: string | null;         // Musical key (e.g., C, F#m)
  tags?: string | null;        // Comma-separated tags
  views: number;               // View count
}
