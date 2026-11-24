export type Project = {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  stack: string[];
  repo: string;
  purpose: string;
  approach: string;
  limit: string;
};
export const projects: Project[] = [
  {
    id: "inkmath",
    name: "InkMath",
    category: "Desktop / Developer tools",
    headline: "A quieter space for complex thinking.",
    description:
      "A local-first Windows notebook that brings LaTeX, PDF annotation and handwritten-style pages into one workspace.",
    stack: ["Electron", "Tectonic", "LaTeX"],
    repo: "InkMath",
    purpose:
      "Keep mathematical writing and annotation close to the documents they belong to, without making a cloud account the center of the workflow.",
    approach:
      "An Electron desktop shell combines a notebook workspace with Tectonic-powered typesetting and PDF annotation tools.",
    limit:
      "Windows-focused desktop software. Local-first does not imply independently audited security or support on every operating system.",
  },
  {
    id: "orbit",
    name: "ORBIT",
    category: "Robotics / Applied ML",
    headline: "Learning to navigate. Measuring the difference.",
    description:
      "A local robotics workstation for comparing PPO reinforcement learning with A* path planning.",
    stack: ["Tauri", "Python", "PPO / A*"],
    repo: "ORBIT",
    purpose:
      "Explore the tradeoffs between a learned navigation policy and a classical path-planning baseline in a repeatable local environment.",
    approach:
      "A Tauri interface connects to Python-based experiments, bringing simulation and navigation comparisons into a desktop workflow.",
    limit:
      "Simulation only. Results do not demonstrate physical robot performance or real-world safety.",
  },
  {
    id: "1c2api",
    name: "1C2API",
    category: "Tooling / Interoperability",
    headline: "From configuration to a readable contract.",
    description:
      "Transform EDT 1C configuration metadata into schemas, OpenAPI definitions, Postman collections and Redoc documentation.",
    stack: ["Python", "OpenAPI", "1C / EDT"],
    repo: "1c2api",
    purpose:
      "Make enterprise configuration structures easier to inspect and communicate through familiar API tooling.",
    approach:
      "Parse configuration metadata and generate structured artifacts for documentation and integration workflows.",
    limit:
      "Generated contracts describe extracted metadata. They are not a deployed API or a guarantee of runtime behavior.",
  },
  {
    id: "prometheus",
    name: "PROMETHEUS",
    category: "Research / Numerical methods",
    headline: "Less material. More questions.",
    description:
      "A plane-stress research baseline exploring structural behavior and SIMP/OC topology optimization.",
    stack: ["Python", "FEM", "SIMP / OC"],
    repo: "PROMETHEUS",
    purpose:
      "Investigate how numerical models and material distributions interact under the assumptions of plane-stress analysis.",
    approach:
      "Combine finite-element analysis with density-based SIMP topology optimization and optimality-criteria updates.",
    limit:
      "A numerical research baseline, not certified hardware, a validated aerospace component or a production engineering solver.",
  },
  {
    id: "qadam",
    name: "Qadam",
    category: "Maps / Applied AI",
    headline: "A different way through Astana.",
    description:
      "A walking-assistant prototype connecting places of interest, routing and optional Gemini-assisted suggestions.",
    stack: ["POI retrieval", "Routing", "Gemini · optional"],
    repo: "wafam",
    purpose:
      "Connect city exploration with a practical walking route instead of leaving recommendations as a disconnected list.",
    approach:
      "Retrieve points of interest and build routes, with an optional generative layer for suggestions and explanations.",
    limit:
      "A prototype. No public service deployment is claimed; route quality depends on the underlying data and providers.",
  },
  {
    id: "komek-kids",
    name: "Komek Kids",
    category: "Education / Accessibility",
    headline: "Small steps toward everyday independence.",
    description:
      "An accessible, video-first educational platform prototype built around approachable learning experiences.",
    stack: ["Next.js", "TypeScript", "Supabase · optional"],
    repo: "komek-kids",
    purpose:
      "Explore accessible ways to present educational videos and support learning through a clear, approachable interface.",
    approach:
      "A Next.js application with an optional Supabase backend provides the foundation for the educational experience.",
    limit:
      "An educational prototype. No clinical effectiveness, formal accessibility certification or production adoption is claimed.",
  },
];
export const educationalRepos = [
  {
    name: "Discrete Mathematics",
    subtitle: "Lecture notes & problem solving · Weeks 1–10",
    repo: "Discrete-Mathematics-Lecture-Notes-and-Problem-Solving-Weeks-1-10-",
    symbol: "∀",
  },
  {
    name: "Calculus I",
    subtitle: "Lecture notes · A foundation for further study",
    repo: "Calculus-1-Lecture-Notes",
    symbol: "∫",
  },
];
