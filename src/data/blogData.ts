import Blog1 from "../assets/blogs/blog1.png";
import Blog2 from "../assets/blogs/blog2.png";
import Blog3 from "../assets/blogs/blog3.png";
import { Blog } from "../types/blogType";

export const blogData: Blog[] = [
  {
    id: "1ab",
    image: Blog1,
    category: "resources",
    title: "Top Resources for Business Management",
    subtitle: "Essential Tools for Modern Business Leaders",
    description:
      "Discover the must-have resources for effective business management",
    introduction:
      "In an era of digital transformation, having the right tools can make the difference between success and stagnation.",
    content: [
      { type: "subtitle", text: "Project Management Solutions" },
      {
        type: "paragraph",
        text: "In today's competitive landscape, project management tools are no longer optional. Platforms like Asana and Trello have revolutionized how teams collaborate and track progress.",
      },
      { type: "subtitle", text: "Data Analytics Platforms" },
      {
        type: "paragraph",
        text: "From Tableau to Power BI, analytics platforms provide the insights needed to make data-driven decisions. We review the top options for businesses of all sizes.",
      },
      {
        type: "image",
        imageUrl:
          "https://imgs.search.brave.com/yjKzGryu1QJ0HetPL-r37kAySu7mam8VnaRmwVRBbTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vR1pyTnlH/VE1xVE02ZEJpanp1/eldmVnNDRFhsQy16/ZFVKZmlqZ1F4ZUZU/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QTFMekkwTHpRekx6/ZzQvTHpNMk1GOUdY/elV5TkRRei9PRGcz/TjE5UVdrWjZkMk0x/L1QxZEtNMDFVVjFG/V1JtWkkvUzNkMU1V/UlNWazFoVTJkUS9l/QzVxY0dj",
        imageAlt: "Data visualization dashboard example",
      },
      {
        type: "quote",
        text: "The right analytics tool doesn't just show you data - it tells you a story about your business",
      },
      { type: "subtitle", text: "Mentorship Programs" },
      {
        type: "paragraph",
        text: "Often overlooked, mentorship provides insights no software can match. We include recommendations for finding quality mentorship opportunities.",
      },
      {
        type: "image",
        imageUrl:
          "https://imgs.search.brave.com/yjKzGryu1QJ0HetPL-r37kAySu7mam8VnaRmwVRBbTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vR1pyTnlH/VE1xVE02ZEJpanp1/eldmVnNDRFhsQy16/ZFVKZmlqZ1F4ZUZU/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QTFMekkwTHpRekx6/ZzQvTHpNMk1GOUdY/elV5TkRRei9PRGcz/TjE5UVdrWjZkMk0x/L1QxZEtNMDFVVjFG/V1JtWkkvUzNkMU1V/UlNWazFoVTJkUS9l/QzVxY0dj",
        imageAlt: "Data visualization dashboard example",
      },
      { type: "subtitle", text: "Integration Strategies" },
      {
        type: "paragraph",
        text: "Having tools isn't enough - they need to work together seamlessly. We discuss best practices for creating a cohesive tech stack.",
      },
    ],
    author: "Jane Smith",
    date: "May 15, 2023",
    readTime: "8 min read",
  },
  {
    id: "2ab",
    image: Blog2,
    category: "guides",
    title: "Your Roadmap to Success",
    subtitle: "A Step-by-Step Guide to Business Growth",
    description:
      "Navigate your business journey with our comprehensive roadmap",
    introduction:
      "Building a successful business requires more than just a good idea - it demands a clear, actionable plan.",
    content: [
      { type: "subtitle", text: "Phase 1: Foundation Building" },
      {
        type: "paragraph",
        text: "Many businesses rush through this critical stage. We emphasize the importance of solid groundwork before scaling, including legal structures and financial systems.",
      },
      { type: "subtitle", text: "Phase 2: Strategic Growth" },
      {
        type: "paragraph",
        text: "This phase covers market expansion strategies and team building exercises that foster innovation while maintaining stability.",
      },
      {
        type: "image",
        imageUrl:
          "https://imgs.search.brave.com/yjKzGryu1QJ0HetPL-r37kAySu7mam8VnaRmwVRBbTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vR1pyTnlH/VE1xVE02ZEJpanp1/eldmVnNDRFhsQy16/ZFVKZmlqZ1F4ZUZU/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QTFMekkwTHpRekx6/ZzQvTHpNMk1GOUdY/elV5TkRRei9PRGcz/TjE5UVdrWjZkMk0x/L1QxZEtNMDFVVjFG/V1JtWkkvUzNkMU1V/UlNWazFoVTJkUS9l/QzVxY0dj",
        imageAlt: "Data visualization dashboard example",
      },
      {
        type: "quote",
        text: "Growth without strategy is just motion - make sure you're moving in the right direction",
      },
      { type: "subtitle", text: "Phase 3: Sustainable Scaling" },
      {
        type: "paragraph",
        text: "True success isn't just about reaching the top - it's about staying there. Learn how to maintain your position through continuous improvement.",
      },
    ],
    author: "Michael Johnson",
    date: "June 2, 2023",
    readTime: "10 min read",
  },
  {
    id: "3ab",
    image: Blog3,
    category: "updates",
    title: "Latest Updates in ERP Technology",
    subtitle: "What's New in Enterprise Resource Planning",
    description: "Stay ahead with the newest developments in ERP systems",
    introduction:
      "The ERP landscape is evolving rapidly, with new features that are transforming business operations.",
    content: [
      { type: "subtitle", text: "AI Integration" },
      {
        type: "paragraph",
        text: "Modern ERP systems now include AI capabilities that go beyond simple automation, offering predictive analytics and intelligent process optimization.",
      },
      { type: "subtitle", text: "Modular Solutions" },
      {
        type: "paragraph",
        text: "The shift toward modular ERP allows businesses to pay only for needed features, with the flexibility to scale as requirements change.",
      },
      {
        type: "image",
        imageUrl:
          "https://imgs.search.brave.com/yjKzGryu1QJ0HetPL-r37kAySu7mam8VnaRmwVRBbTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vR1pyTnlH/VE1xVE02ZEJpanp1/eldmVnNDRFhsQy16/ZFVKZmlqZ1F4ZUZU/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QTFMekkwTHpRekx6/ZzQvTHpNMk1GOUdY/elV5TkRRei9PRGcz/TjE5UVdrWjZkMk0x/L1QxZEtNMDFVVjFG/V1JtWkkvUzNkMU1V/UlNWazFoVTJkUS9l/QzVxY0dj",
        imageAlt: "Data visualization dashboard example",
      },
      {
        type: "quote",
        text: "The future of ERP lies in customization - one size hasn't fit all for a long time",
      },
      { type: "subtitle", text: "Enhanced Security" },
      {
        type: "paragraph",
        text: "With rising cyber threats, new ERP systems incorporate advanced protection mechanisms including behavioral analytics and zero-trust architectures.",
      },
      { type: "subtitle", text: "Mobile Optimization" },
      {
        type: "paragraph",
        text: "The latest updates prioritize mobile functionality, allowing managers to approve workflows and monitor operations from anywhere.",
      },
    ],
    author: "Sarah Williams",
    date: "June 18, 2023",
    readTime: "12 min read",
  },
  {
    id: "4ab",
    image: Blog1,
    category: "resources",
    title: "Top Resources for Business Management",
    subtitle: "Essential Tools for Modern Business Leaders",
    description:
      "Discover the must-have resources for effective business management",
    introduction:
      "In an era of digital transformation, having the right tools can make the difference between success and stagnation.",
    content: [
      { type: "subtitle", text: "Project Management Solutions" },
      {
        type: "paragraph",
        text: "In today's competitive landscape, project management tools are no longer optional. Platforms like Asana and Trello have revolutionized how teams collaborate and track progress.",
      },
      { type: "subtitle", text: "Data Analytics Platforms" },
      {
        type: "paragraph",
        text: "From Tableau to Power BI, analytics platforms provide the insights needed to make data-driven decisions. We review the top options for businesses of all sizes.",
      },
      {
        type: "image",
        imageUrl:
          "https://imgs.search.brave.com/yjKzGryu1QJ0HetPL-r37kAySu7mam8VnaRmwVRBbTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vR1pyTnlH/VE1xVE02ZEJpanp1/eldmVnNDRFhsQy16/ZFVKZmlqZ1F4ZUZU/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QTFMekkwTHpRekx6/ZzQvTHpNMk1GOUdY/elV5TkRRei9PRGcz/TjE5UVdrWjZkMk0x/L1QxZEtNMDFVVjFG/V1JtWkkvUzNkMU1V/UlNWazFoVTJkUS9l/QzVxY0dj",
        imageAlt: "Data visualization dashboard example",
      },
      {
        type: "quote",
        text: "The right analytics tool doesn't just show you data - it tells you a story about your business",
      },
      { type: "subtitle", text: "Mentorship Programs" },
      {
        type: "paragraph",
        text: "Often overlooked, mentorship provides insights no software can match. We include recommendations for finding quality mentorship opportunities.",
      },
      {
        type: "image",
        imageUrl:
          "https://imgs.search.brave.com/yjKzGryu1QJ0HetPL-r37kAySu7mam8VnaRmwVRBbTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vR1pyTnlH/VE1xVE02ZEJpanp1/eldmVnNDRFhsQy16/ZFVKZmlqZ1F4ZUZU/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QTFMekkwTHpRekx6/ZzQvTHpNMk1GOUdY/elV5TkRRei9PRGcz/TjE5UVdrWjZkMk0x/L1QxZEtNMDFVVjFG/V1JtWkkvUzNkMU1V/UlNWazFoVTJkUS9l/QzVxY0dj",
        imageAlt: "Data visualization dashboard example",
      },
      { type: "subtitle", text: "Integration Strategies" },
      {
        type: "paragraph",
        text: "Having tools isn't enough - they need to work together seamlessly. We discuss best practices for creating a cohesive tech stack.",
      },
    ],
    author: "Jane Smith",
    date: "May 15, 2023",
    readTime: "8 min read",
  },
  {
    id: "5ab",
    image: Blog2,
    category: "guides",
    title: "Your Roadmap to Success",
    subtitle: "A Step-by-Step Guide to Business Growth",
    description:
      "Navigate your business journey with our comprehensive roadmap",
    introduction:
      "Building a successful business requires more than just a good idea - it demands a clear, actionable plan.",
    content: [
      { type: "subtitle", text: "Phase 1: Foundation Building" },
      {
        type: "paragraph",
        text: "Many businesses rush through this critical stage. We emphasize the importance of solid groundwork before scaling, including legal structures and financial systems.",
      },
      { type: "subtitle", text: "Phase 2: Strategic Growth" },
      {
        type: "paragraph",
        text: "This phase covers market expansion strategies and team building exercises that foster innovation while maintaining stability.",
      },
      {
        type: "image",
        imageUrl:
          "https://imgs.search.brave.com/yjKzGryu1QJ0HetPL-r37kAySu7mam8VnaRmwVRBbTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vR1pyTnlH/VE1xVE02ZEJpanp1/eldmVnNDRFhsQy16/ZFVKZmlqZ1F4ZUZU/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QTFMekkwTHpRekx6/ZzQvTHpNMk1GOUdY/elV5TkRRei9PRGcz/TjE5UVdrWjZkMk0x/L1QxZEtNMDFVVjFG/V1JtWkkvUzNkMU1V/UlNWazFoVTJkUS9l/QzVxY0dj",
        imageAlt: "Data visualization dashboard example",
      },
      {
        type: "quote",
        text: "Growth without strategy is just motion - make sure you're moving in the right direction",
      },
      { type: "subtitle", text: "Phase 3: Sustainable Scaling" },
      {
        type: "paragraph",
        text: "True success isn't just about reaching the top - it's about staying there. Learn how to maintain your position through continuous improvement.",
      },
    ],
    author: "Michael Johnson",
    date: "June 2, 2023",
    readTime: "10 min read",
  },
  {
    id: "6ab",
    image: Blog3,
    category: "updates",
    title: "Latest Updates in ERP Technology",
    subtitle: "What's New in Enterprise Resource Planning",
    description: "Stay ahead with the newest developments in ERP systems",
    introduction:
      "The ERP landscape is evolving rapidly, with new features that are transforming business operations.",
    content: [
      { type: "subtitle", text: "AI Integration" },
      {
        type: "paragraph",
        text: "Modern ERP systems now include AI capabilities that go beyond simple automation, offering predictive analytics and intelligent process optimization.",
      },
      { type: "subtitle", text: "Modular Solutions" },
      {
        type: "paragraph",
        text: "The shift toward modular ERP allows businesses to pay only for needed features, with the flexibility to scale as requirements change.",
      },
      {
        type: "image",
        imageUrl:
          "https://imgs.search.brave.com/yjKzGryu1QJ0HetPL-r37kAySu7mam8VnaRmwVRBbTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vR1pyTnlH/VE1xVE02ZEJpanp1/eldmVnNDRFhsQy16/ZFVKZmlqZ1F4ZUZU/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QTFMekkwTHpRekx6/ZzQvTHpNMk1GOUdY/elV5TkRRei9PRGcz/TjE5UVdrWjZkMk0x/L1QxZEtNMDFVVjFG/V1JtWkkvUzNkMU1V/UlNWazFoVTJkUS9l/QzVxY0dj",
        imageAlt: "Data visualization dashboard example",
      },
      {
        type: "quote",
        text: "The future of ERP lies in customization - one size hasn't fit all for a long time",
      },
      { type: "subtitle", text: "Enhanced Security" },
      {
        type: "paragraph",
        text: "With rising cyber threats, new ERP systems incorporate advanced protection mechanisms including behavioral analytics and zero-trust architectures.",
      },
      { type: "subtitle", text: "Mobile Optimization" },
      {
        type: "paragraph",
        text: "The latest updates prioritize mobile functionality, allowing managers to approve workflows and monitor operations from anywhere.",
      },
    ],
    author: "Sarah Williams",
    date: "June 18, 2023",
    readTime: "12 min read",
  },
];

export const getBlogsByCategory = (category = "all") => {
  return category === "all"
    ? blogData
    : blogData.filter((blog) => blog.category === category);
};
