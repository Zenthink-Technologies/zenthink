import { BlogContentSection } from "./blogContentSection";

export interface Blog {
  id: string;
  image: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  introduction: string;
  content: BlogContentSection[];
  author: string;
  date: string;
  readTime: string;
}
