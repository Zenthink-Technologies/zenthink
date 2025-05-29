export interface BlogContentSection {
  type: "paragraph" | "subtitle" | "quote" | "image";
  text?: string;
  author?: string;
  imageUrl?: string;
  imageAlt?: string;
}
