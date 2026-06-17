export type Project = {
  name: string;
  role: string;
  stack: string[];
  signal: string;
  github: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  detail: string;
};

export const profile = {
  name: "Nikhil Tomar",
  handle: "nikhiltomar2712",
  location: "New Delhi, India",
  headline: "Cybersecurity builder aiming for red team work in Japan",
  github: "https://github.com/nikhiltomar2712",
  target: "Cyber Security Engineer in Japan",
  japaneseLevel: "JLPT N3 path",
  introduction:
    "I am Nikhil Tomar from New Delhi, a cybersecurity enthusiast focused on ethical hacking, threat hunting, red team operations, and security automation. My GitHub profile points toward a hands-on builder mindset: Python security tools, Japanese learning projects, defensive and offensive security practice, and a clear career direction toward cyber security work in Japan.",
  mission:
    "My goal is to join a red team in Japan, sharpen real-world adversary simulation skills, and bridge technical security work with Japanese language and professional culture.",
  strengths: [
    "Red team thinking",
    "Threat hunting curiosity",
    "Python automation",
    "Security research notes",
    "Japanese learning discipline",
    "GitHub project shipping"
  ],
  stack: ["Python", "TypeScript", "JavaScript", "HTML", "CSS", "Go", "Ruby"],
  projects: [
    {
      name: "cybersec",
      role: "Cyber security practice repo",
      stack: ["Python", "Security", "Learning"],
      signal:
        "Shows direct investment in security learning and Python-based exploration.",
      github: "https://github.com/nikhiltomar2712/cybersec"
    },
    {
      name: "sniffer",
      role: "Network/security utility",
      stack: ["Python", "Networking", "Security"],
      signal:
        "Fits the red-team foundation: traffic awareness, scripting, and low-level security curiosity.",
      github: "https://github.com/nikhiltomar2712/sniffer"
    },
    {
      name: "watashi-no-nihongo",
      role: "Japanese learning system",
      stack: ["Python", "Japanese", "Study workflow"],
      signal:
        "Shows a serious Japan direction: vocabulary, study structure, and consistent learning practice for N3 and beyond.",
      github: "https://github.com/nikhiltomar2712/watashi-no-nihongo"
    },
    {
      name: "InstaStatus-Analyzer",
      role: "Analysis and automation tool",
      stack: ["Python", "Data analysis", "Automation"],
      signal:
        "Represents practical scripting, parsing, and investigative thinking useful for OSINT-style workflows.",
      github: "https://github.com/nikhiltomar2712/InstaStatus-Analyzer"
    },
    {
      name: "Cyber Portfolio System",
      role: "Multi-language personal platform",
      stack: ["Python", "TypeScript", "Go", "Ruby", "CSS", "HTML", "JavaScript"],
      signal:
        "This project ties the profile into a high-motion 3D portfolio with generated intelligence cards and security-themed pages.",
      github: "https://github.com/nikhiltomar2712"
    }
  ] satisfies Project[],
  timeline: [
    {
      year: "Now",
      title: "BCA + cybersecurity practice",
      detail:
        "Building fundamentals in programming, networks, automation, offensive security, and defensive investigation."
    },
    {
      year: "N3",
      title: "Japanese language track",
      detail:
        "Learning Japanese toward professional communication in Japan, currently around the N3 goal line."
    },
    {
      year: "Next",
      title: "Red team specialization",
      detail:
        "Focus on labs, reporting, adversary emulation, web security, Active Directory, cloud security, and responsible disclosure habits."
    },
    {
      year: "Japan",
      title: "Cyber security engineer",
      detail:
        "Target role: red team cyber security engineer working with discipline, documentation, and cross-cultural communication."
    }
  ] satisfies TimelineItem[]
};
