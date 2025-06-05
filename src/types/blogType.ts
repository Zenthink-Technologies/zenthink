export interface Blog {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  introduction: string;
  content: BlogContentSection[];
  category: "resources" | "guides" | "updates";
  image: string;
  author: string;
  date: string;
  readTime: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogContentSection {
  type: "paragraph" | "subtitle" | "quote" | "image";
  text?: string;
  author?: string;
  imageUrl?: string;
  imageAlt?: string;
}
