export const repositoryMedia: Record<
  string,
  { src: string; alt: string; caption: string; source: string }
> = {
  inkmath: {
    src: "/assets/screenshots/inkmath-workspace.png",
    alt: "InkMath application workspace showing a probability and statistics notebook",
    caption: "Application screenshot · from the InkMath repository",
    source:
      "https://github.com/Smrbruh/InkMath/blob/main/docs/media/workspace.png",
  },
  qadam: {
    src: "/assets/screenshots/qadam-overview.png",
    alt: "Qadam interface with walking preferences and a map of Astana",
    caption: "Prototype screenshot · from the Qadam repository",
    source: "https://github.com/Smrbruh/wafam/blob/main/demo/01-overview.png",
  },
  prometheus: {
    src: "/assets/screenshots/prometheus-fields.png",
    alt: "Six numerical candidate material distributions from the PROMETHEUS research repository",
    caption:
      "Numerical candidate fields · repository figure, not physical test results",
    source:
      "https://github.com/Smrbruh/PROMETHEUS/blob/main/results/figures/candidate_fields.png",
  },
};
