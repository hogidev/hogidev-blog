export interface Project {
  num: string;
  title: string;
  description: string;
  tags: string[];
}

/** Replace with your real work. */
export const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'Project One',
    description: "One sentence about what this project does, who it's for, and what made it interesting to build.",
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    num: '02',
    title: 'Project Two',
    description: "One sentence about what this project does, who it's for, and what made it interesting to build.",
    tags: ['TypeScript', 'GraphQL'],
  },
  {
    num: '03',
    title: 'Project Three',
    description: "One sentence about what this project does, who it's for, and what made it interesting to build.",
    tags: ['Next.js', 'AWS'],
  },
  {
    num: '04',
    title: 'Project Four',
    description: "One sentence about what this project does, who it's for, and what made it interesting to build.",
    tags: ['three.js', 'WebGL'],
  },
];
