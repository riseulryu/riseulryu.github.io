window.SITE = {
  name: "Riseul Ryu",
  title: "Dr",
  // One-line summary shown in the hero on the home page
  summary: "AI researcher and lecturer building machine learning models that adapt as people's behaviour changes.",
  tagline: "Lecturer in Computer Science · Adaptive machine learning and AI in education",
  location: "Sydney, NSW",
  photo: "",                      
  email: "riseulryu@gmail.com",   
  cvPdf: "",                      

  profiles: [
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=TtP6d3QAAAAJ" },
    { label: "ORCID", url: "https://orcid.org/0000-0001-9238-6358" }
    // { label: "LinkedIn", url: "https://www.linkedin.com/in/..." }
  ],

  /* ---------------- Home page ---------------- */
  // Facts shown in the panel beside your name on the home page
  heroFacts: [
    { k: "Current role", v: "Academic Manager (Business) / Senior Lecturer, Education Centre of Australia, Sydney" },
    { k: "Also", v: "Adjunct Researcher, School of ICT, University of Tasmania" },
    { k: "PhD", v: "Information Technology, University of Tasmania, 2026" },
    { k: "Focus", v: "Adaptive machine learning · Biometric authentication · Computing education" }
  ],
  intro: "I'm an Academic Manager (Business) and Senior Lecturer at Education Centre of Australia in Sydney, which delivers University of Tasmania programs at the Ultimo Study Centre, and an Adjunct Researcher in the UTAS School of ICT. I completed my PhD in Information Technology at the University of Tasmania in 2026.",
  home: {
    research: "My research is on adaptive machine learning: models that keep working as the people using them change. I apply it to biometric authentication and computing education, and I'm planning work on AI in mental health.",
    teaching: "Seven years of university teaching in programming, web development, big data analysis and software engineering, at the University of Tasmania, Charles Sturt University and the Ultimo Study Centre. Six Student Nominated Teaching Awards.",
    engagement: "I sit on the organising committee for the Asia-Korea Conference on Science and Technology 2026, am web manager and editor for the Korean Academy of Scientists and Engineers in Australasia, and have given a guest lecture on AI in healthcare."
  },

  /* ---------------- Bio page ---------------- */
  bio: [
    "I'm an early-career AI researcher and lecturer in Sydney. I build machine learning models that adapt as people's behaviour changes, and apply them to biometric authentication and education. My PhD in Information Technology (University of Tasmania, 2026) looked at dynamic adaptation in multimodal biometric authentication.",
    "I'm now Academic Manager (Business) and Senior Lecturer at Education Centre of Australia, which delivers University of Tasmania programs at the Ultimo Study Centre, and an Adjunct Researcher in the UTAS School of ICT. I've taught at university level for seven years and received six Student Nominated Teaching Awards.",
    "Before academia I trained in economics and accounting and worked as an accountant at Air Liquide Korea, where I tested the finance side of an Oracle ERP migration."
  ],
  employment: [
    { when: "Oct 2026–present", what: "Adjunct Researcher", where: "School of ICT, University of Tasmania" },
    { when: "Aug 2026–present", what: "Academic Manager (Business) / Senior Lecturer", where: "Education Centre of Australia, Sydney" },
    { when: "Jun–Aug 2026", what: "Subject Writer (ICT)", where: "Ikon Institute of Australia, Sydney" },
    { when: "Jun 2025–Jul 2026", what: "Lecturer (ICT)", where: "Education Centre of Australia, Sydney" },
    { when: "Aug–Oct 2025", what: "Interim Academic Manager (ICT)", where: "Education Centre of Australia, Sydney" },
    { when: "Mar–Jun 2025", what: "Sessional Lecturer", where: "Charles Sturt University, Sydney" },
    { when: "Jul 2019–Jun 2025", what: "Casual Academic", where: "School of ICT, University of Tasmania, Hobart" },
    { when: "Jul 2015–Jan 2018", what: "Accountant", where: "Air Liquide Korea, Seoul" }
  ],
  education: [
    { when: "2026", what: "Doctor of Philosophy, Information Technology", where: "University of Tasmania" },
    { when: "2026", what: "Graduate Certificate in Research", where: "University of Tasmania" },
    { when: "2019", what: "Master of Information Technology and Systems", where: "University of Tasmania" },
    { when: "2015", what: "Master of Professional Accounting, Business Management", where: "University of Tasmania" },
    { when: "2012", what: "Bachelor of Economics", where: "University of Tasmania" }
  ],
  memberships: [
    { when: "2024–present", what: "Australian Information Security Association", where: "" },
    { when: "2023–present", what: "Australian Computer Society", where: "" },
    { when: "2019–present", what: "Korean Academy of Scientists and Engineers in Australasia", where: "" }
  ],

  /* ---------------- Research page ---------------- */
  // key "citations" / "hindex" are filled in from assets/scholar.json (updated weekly).
  stats: [
    { key: "citations", label: "Citations", note: "Google Scholar, Oct 2026", value: "306" },
    { key: "hindex", label: "h-index", note: "Google Scholar, Oct 2026", value: "6" }
  ],
  research: {
    overview: [
      "I build machine learning models that adapt as people's behaviour changes, a problem known as distribution shift. A model trained on someone's past data can lose accuracy as their signals drift, and different people drift in different ways.",
      "My PhD applied this to multimodal biometric authentication, using face and keystroke dynamics. I also apply machine learning to student analytics and study how students learn computing. Next, I plan to bring the same approach to behavioural digital biomarkers for mental health.",
      "I work with collaborators at the University of Tasmania and Chonnam National University, Korea."
    ],
    areas: [
      { id: "mental-health", title: "AI in mental health", status: "Ongoing", tag: "",
        short: "Whether passive behavioural and biometric signals can indicate mental health conditions.",
        overview: [
          "My next direction is behavioural digital biomarkers for mental health: whether passive behavioural and biometric signals can indicate mental health conditions.",
          "I plan to focus on diverse populations, including young people, and to carry over the user-dependent adaptation approach from my PhD, since people's signals vary in different ways."
        ],
        noPubs: "No publications in this area yet." },
      { id: "biometrics", title: "Biometric authentication", status: "PhD research & Ongoing", tag: "bio",
        short: "Face and keystroke authentication that adapts to each user over time and across devices.",
        overview: [
          "My PhD, Dynamic Adaptation in Multimodal Biometric Authentication (University of Tasmania, 2026; supervisors A/Prof Julian Dermoudy, Dr Soonja Yeom and Dr David Herbert), looked at authentication that combines face and keystroke dynamics and adapts to each user over time and across devices.",
          "I found that a single adaptation rule gave mixed results across three datasets (CMU, GREYC and Mobile), and traced this to differences in how much users' signals vary. User-dependent adaptation based on biometric zoo theory performed better on every dataset (Mobile face balanced accuracy rose from 0.750 to 0.796) and lowered false non-match rates, with no significant change in false match rate (Wilcoxon signed-rank tests).",
          "A paper on user-dependent adaptation is under review at Expert Systems with Applications."
        ] },
      { id: "computing-education", title: "Computing education", status: "Ongoing", tag: "edu",
        short: "Collaborative learning, gender in IT education, and AI for dropout prediction.",
        overview: [
          "I study how students learn computing and how to support those at risk. A project-based collaborative learning intervention I proposed raised group task scores from 56.58 to 62.14 (F = 5.53, p = 0.019; ITiCSE 2022), and I analysed the data for a study of gender and collaborative learning in IT education (ACE 2025).",
          "I also work on AI for student analytics, including course-level clustering to improve dropout prediction (IEEE Access, 2025), with collaborators at the University of Tasmania and Chonnam National University, Korea."
        ] }
    ],
    underReview: [
      "Ryu, R., Yeom, S., Herbert, D., & Dermoudy, J. User-dependent adaptation in multimodal biometric authentication. Under review, Expert Systems with Applications."
    ]
  },

  /* ---------------- Publications ----------------
     tags: "bio" biometric authentication; "edu" computing education
     cites: filled in automatically from assets/scholar.json */
  authorMatch: ["R. Ryu"],
  publications: [
    { year: 2025, type: "journal", tags: ["bio"],
      title: "From fusion to adaptation: Investigation on enhancing multimodal biometric authentication systems",
      authors: "R. Ryu, S. Yeom, D. Herbert, J. Dermoudy",
      venue: "IEEE Access, 13, 146169–146188", doi: "10.1109/ACCESS.2025.3599907" },
    { year: 2025, type: "journal", tags: ["edu"],
      title: "Course-level clustering to enhance dropout prediction accuracy",
      authors: "Y. Lu, S. Yeom, R. Ryu, S.-H. Kim",
      venue: "IEEE Access, 13, 204996–205013", doi: "10.1109/ACCESS.2025.3639083" },
    { year: 2025, type: "conference", tags: ["edu"],
      title: "Exploring gender disparities and collaborative learning in IT education",
      authors: "S. Yeom, N. Herbert, R. Ryu",
      venue: "Australasian Computing Education Conference (ACE)", doi: "10.1145/3716640.3716645" },
    { year: 2023, type: "journal", tags: ["bio"],
      title: "A comprehensive survey of context-aware continuous implicit authentication in online learning environments",
      authors: "R. Ryu, S. Yeom, D. Herbert, J. Dermoudy",
      venue: "IEEE Access, 11, 24561–24573", doi: "10.1109/ACCESS.2023.3253484" },
    { year: 2023, type: "journal", tags: ["bio"],
      title: "The design and evaluation of adaptive biometric authentication systems: Current status, challenges and future direction",
      authors: "R. Ryu, S. Yeom, D. Herbert, J. Dermoudy",
      venue: "ICT Express, 9(6), 1183–1197", doi: "10.1016/j.icte.2023.04.003" },
    { year: 2022, type: "conference", tags: ["bio"],
      title: "An adaptive biometric authentication system for online learning environments across multiple devices",
      authors: "R. Ryu, S. Yeom, D. Herbert, J. Dermoudy",
      venue: "Artificial Intelligence in Education (AIED), Lecture Notes in Computer Science, 13356, 375–378", doi: "10.1007/978-3-031-11647-6_73" },
    { year: 2022, type: "conference", tags: ["edu"],
      title: "Project-based collaborative learning enhances students' programming performance",
      authors: "S. Yeom, N. Herbert, R. Ryu",
      venue: "ITiCSE, 248–254", doi: "10.1145/3502718.3524779" },
    { year: 2021, type: "journal", tags: ["bio"], cites: 185,
      title: "Continuous multimodal biometric authentication schemes: A systematic review",
      authors: "R. Ryu, S. Yeom, S.-H. Kim, D. Herbert",
      venue: "IEEE Access, 9, 34541–34557", doi: "10.1109/ACCESS.2021.3061589" },
    { year: 2020, type: "conference", tags: [],
      title: "Blockchain-based renewable energy trading system with smart contract in a small local community",
      authors: "R. Ryu, S. Yeom",
      venue: "SMA 2020: 9th International Conference on Smart Media and Applications, Jeju, 224–230", doi: "10.1145/3426020.3426078" },
    { year: 2020, type: "conference", tags: ["bio"],
      title: "Continuous multibiometric authentication for online exam with machine learning",
      authors: "R. Ryu, S. Yeom, S.-H. Kim",
      venue: "Australasian Conference on Information Systems (ACIS)", doi: "" },
    { year: 2020, type: "conference", tags: [],
      title: "UTAS-Ride: Organization-based ridesharing platform for commuters",
      authors: "Z. Wei, S. Yeom, R. Ryu",
      venue: "Australasian Conference on Information Systems (ACIS)", doi: "" },
    { year: 2019, type: "conference", tags: [],
      title: "Prototype ultrasonic wayfinder with haptic feedback for an IoT environment",
      authors: "S. Yeom, R. Ryu, E. Pak, P. Kim",
      venue: "MCCSIS/IHCI 2019", doi: "10.33965/ihci2019_201906c038" }
  ],

  /* ---------------- Teaching page ---------------- */
  teaching: {
    intro: "I've taught at university level since 2019, at the University of Tasmania, Charles Sturt University and the Ultimo Study Centre in Sydney, in person and online, with culturally diverse cohorts throughout.",
    approach: [
      { head: "Early support for students at risk", text: "Monthly checks of student and learning management data, targeted deadline reminders and extra consultation in assessment weeks." },
      { head: "Plain-language explanation", text: "Programming concepts explained in plain language and backed by live demonstration." },
      { head: "Project-based and flipped learning", text: "Flipped classroom, live demonstration and project-based methods; students test real systems and write them up as project reports." },
      { head: "Real-world examples", text: "Each security concept paired with an example from the news or a real security incident." },
      { head: "Aligned design", text: "Lecture content, practicals and assessments designed as one sequence." },
      { head: "Online delivery", text: "Brightspace and live Zoom sessions with shared whiteboard and breakout rooms." }
    ],
    roles: [
      { org: "Education Centre of Australia (UTAS Ultimo Study Centre), Sydney", years: "Jun 2025–present", role: "Lecturer (ICT), then Academic Manager (Business) / Senior Lecturer",
        units: ["Programming Fundamentals (KIT101)", "Web Development (including SQL)", "ICT Systems Administration", "People and Organisations"] },
      { org: "Ikon Institute of Australia, Sydney", years: "Jun–Aug 2026", role: "Subject Writer (ICT): curriculum for two new subjects",
        units: ["Information Security", "Adversarial AI and Cyberdefence"] },
      { org: "Charles Sturt University, Sydney", years: "Mar–Jun 2025", role: "Sessional Lecturer: designed and delivered",
        units: ["Computer Systems", "Introduction to the Web", "Foundation of Big Data Analysis"] },
      { org: "University of Tasmania, School of ICT, Hobart", years: "Jul 2019–Jun 2025", role: "Casual Academic: one to two units a semester, in person and online",
        units: ["Programming", "Web Development", "Software Test and Quality Management", "Enterprise Architecture", "Multi-perspective ICT Project", "ICT Research Principles"] }
    ],
    guest: [
      { when: "", what: "\"Artificial Intelligence in Healthcare\"", where: "BAA500 Introduction to Health Information Management, University of Tasmania", detail: "Master of Health Service Management" }
    ],
    recognition: [
      { value: "6", label: "Student Nominated Teaching Awards", note: "University of Tasmania: 2019, 2020, 2022, 2023, 2024, 2025" },
      { value: "2", label: "Teaching Merit Certificates", note: "University of Tasmania: 2021, 2023" },
      { value: "98.07%", label: "Student satisfaction", note: "Charles Sturt University, 2025 (57% response rate)" },
      { value: "89%", label: "Student satisfaction", note: "Charles Sturt University, 2025 (27% response rate)" }
    ],
    supervision: [
      "Mentored a master's student through the systematic literature review process over four sessions and reviewed their paper. The student finished on time and moved on to further postgraduate study.",
      "Reviewed and gave writing feedback on a master's student's dropout prediction research, published in IEEE Access (2025) with me as co-author.",
      "As Adjunct Researcher at UTAS (Oct 2026–present), scope to co-supervise research students."
    ]
  },

  /* ---------------- Public engagement (home page) ---------------- */
  engagement: [
    { when: "2026", what: "Organising Committee & Chair for Workshop for Next-Generation Scientists and Engineers", where: "Asia-Korea Conference on Science and Technology 2026 (AKC 2026)" },
    { when: "Guest lecture", what: "\"Artificial Intelligence in Healthcare\"", where: "BAA500 Introduction to Health Information Management, University of Tasmania", detail: "Master of Health Service Management" },
    { when: "2024–present", what: "Administrator, Web Manager and Editor", where: "Korean Academy of Scientists and Engineers in Australasia (KASEA)" },
    { when: "2023, 2025", what: "Australia representative, Young Professional Forum", where: "Korean Federation of Science and Technology Societies (KOFST)" },
    { when: "2023–2025", what: "HDR Student Representative", where: "School of ICT, University of Tasmania" }
  ],


  contactNote: "I'm open to research collaborations in adaptive machine learning, biometric authentication, student analytics and digital mental health, and to conversations about academic roles. Referees are available on request."
};
