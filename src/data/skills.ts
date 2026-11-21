export type SkillIcon =
  | "file-code"
  | "palette"
  | "braces"
  | "code"
  | "atom"
  | "component"
  | "wind"
  | "git-branch"
  | "git-fork"
  | "triangle"
  | "pen-tool"
  | "layout-grid"
  | "route";

export type SkillGroup = {
  title: string;
  label: string;
  items: { name: string; icon: SkillIcon }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Core technologies",
    label: "Foundations",
    items: [
      { name: "HTML5", icon: "file-code" },
      { name: "CSS3", icon: "palette" },
      { name: "JavaScript", icon: "braces" },
      { name: "TypeScript", icon: "code" },
    ],
  },
  {
    title: "Frameworks",
    label: "Application layer",
    items: [
      { name: "React", icon: "atom" },
      { name: "Next.js", icon: "component" },
    ],
  },
  {
    title: "Styling",
    label: "Interface",
    items: [{ name: "Tailwind CSS", icon: "wind" }],
  },
  {
    title: "Development tools",
    label: "Workflow",
    items: [
      { name: "Git", icon: "git-branch" },
      { name: "GitHub", icon: "git-fork" },
      { name: "Vercel", icon: "triangle" },
    ],
  },
  {
    title: "Design",
    label: "Product",
    items: [
      { name: "Figma", icon: "pen-tool" },
      { name: "UI Design", icon: "layout-grid" },
      { name: "UX Design", icon: "route" },
    ],
  },
];
