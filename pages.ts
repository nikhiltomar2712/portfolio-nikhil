import { profile } from "../data/profile";

export type PageId = "home" | "about" | "arsenal" | "projects" | "japan";

export const pages: { id: PageId; label: string; glyph: string }[] = [
  { id: "home", label: "Home", glyph: "01" },
  { id: "about", label: "About", glyph: "02" },
  { id: "arsenal", label: "Arsenal", glyph: "03" },
  { id: "projects", label: "Projects", glyph: "04" },
  { id: "japan", label: "Japan", glyph: "05" }
];

export function resolvePage(hash: string): PageId {
  const id = hash.replace("#/", "") as PageId;
  return pages.some((page) => page.id === id) ? id : "home";
}

export function pageTitle(id: PageId): string {
  const titles: Record<PageId, string> = {
    home: "Red Team Future",
    about: "Profile Signal",
    arsenal: "Security Arsenal",
    projects: "GitHub Operations",
    japan: "Japan Mission"
  };

  return `${titles[id]} // ${profile.handle}`;
}
