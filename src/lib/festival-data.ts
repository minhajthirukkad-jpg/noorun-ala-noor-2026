export type Result = {
  id: string;
  program: string;
  category: string;
  stage: "On-Stage" | "Off-Stage";
  competitor: string;
  chest: string;
  team: string;
  position: "1st" | "2nd" | "3rd";
  grade: string;
  score: number;
};

export type ProgramStatus = {
  id: string;
  program: string;
  category: string;
  stage: "On-Stage" | "Off-Stage";
  status: "Outed" | "Pending";
};

export const initialResults: Result[] = [
  {
    id: "1",
    program: "SONG ARABIC",
    category: "Super Senior",
    stage: "On-Stage",
    competitor: "NAJAD",
    chest: "239",
    team: "TEAM SURAYYA",
    position: "2nd",
    grade: "NIL",
    score: 5,
  },
  {
    id: "2",
    program: "SONG ARABIC",
    category: "Super Senior",
    stage: "On-Stage",
    competitor: "SHAMIL",
    chest: "434",
    team: "TEAM QAMAR",
    position: "1st",
    grade: "NIL",
    score: 7,
  },
  {
    id: "3",
    program: "SONG MLM SNR",
    category: "Senior",
    stage: "On-Stage",
    competitor: "RAZIN MUHAMMED",
    chest: "430",
    team: "TEAM QAMAR",
    position: "2nd",
    grade: "NIL",
    score: 5,
  },
  {
    id: "4",
    program: "SONG MLM SNR",
    category: "Senior",
    stage: "On-Stage",
    competitor: "ISHAN",
    chest: "401",
    team: "TEAM QAMAR",
    position: "1st",
    grade: "NIL",
    score: 7,
  },
  {
    id: "5",
    program: "HIFZ (G)",
    category: "Sub-Junior",
    stage: "On-Stage",
    competitor: "SIDRA",
    chest: "114",
    team: "TEAM SURAYYA",
    position: "2nd",
    grade: "NIL",
    score: 5,
  },
  {
    id: "6",
    program: "HIFZ (G)",
    category: "Sub-Junior",
    stage: "On-Stage",
    competitor: "JAZA SHERIN",
    chest: "314",
    team: "TEAM QAMAR",
    position: "1st",
    grade: "NIL",
    score: 7,
  },
  {
    id: "7",
    program: "HIFZ (G)",
    category: "Junior",
    stage: "Off-Stage",
    competitor: "ADULA FATHIMA",
    chest: "325",
    team: "TEAM QAMAR",
    position: "2nd",
    grade: "NIL",
    score: 5,
  },
  {
    id: "8",
    program: "HIFZ (G)",
    category: "Junior",
    stage: "Off-Stage",
    competitor: "FATHIMA RIFA",
    chest: "126",
    team: "TEAM SURAYYA",
    position: "1st",
    grade: "NIL",
    score: 7,
  },
  {
    id: "9",
    program: "HANDWRITING ARB (G)",
    category: "Junior",
    stage: "Off-Stage",
    competitor: "HAYA FATHIMA",
    chest: "121",
    team: "TEAM SURAYYA",
    position: "2nd",
    grade: "NIL",
    score: 5,
  },
  {
    id: "10",
    program: "HANDWRITING ARB (G)",
    category: "Junior",
    stage: "Off-Stage",
    competitor: "SHAHDIYA FATHIMA",
    chest: "123",
    team: "TEAM SURAYYA",
    position: "1st",
    grade: "NIL",
    score: 7,
  },
  {
    id: "11",
    program: "HANDWRITING ARB MLM (G)",
    category: "Sub-Junior",
    stage: "Off-Stage",
    competitor: "NAJA FATHIMA",
    chest: "315",
    team: "TEAM QAMAR",
    position: "2nd",
    grade: "NIL",
    score: 5,
  },
  {
    id: "12",
    program: "HANDWRITING ARB MLM (G)",
    category: "Sub-Junior",
    stage: "Off-Stage",
    competitor: "SIDRA",
    chest: "114",
    team: "TEAM SURAYYA",
    position: "1st",
    grade: "NIL",
    score: 7,
  },
  {
    id: "13",
    program: "QIRATH (G)",
    category: "Junior",
    stage: "Off-Stage",
    competitor: "HAYA FATHIMA",
    chest: "121",
    team: "TEAM SURAYYA",
    position: "2nd",
    grade: "NIL",
    score: 5,
  },
  {
    id: "14",
    program: "QIRATH (G)",
    category: "Junior",
    stage: "Off-Stage",
    competitor: "THASHREEFA",
    chest: "128",
    team: "TEAM SURAYYA",
    position: "1st",
    grade: "NIL",
    score: 7,
  },
  {
    id: "15",
    program: "QIRATH (G)",
    category: "Sub-Junior",
    stage: "On-Stage",
    competitor: "NAJA FATHIMA",
    chest: "315",
    team: "TEAM QAMAR",
    position: "2nd",
    grade: "NIL",
    score: 5,
  },
  {
    id: "16",
    program: "QIRATH (G)",
    category: "Sub-Junior",
    stage: "On-Stage",
    competitor: "SIDRA",
    chest: "114",
    team: "TEAM SURAYYA",
    position: "1st",
    grade: "NIL",
    score: 7,
  },
  {
    id: "17",
    program: "GROUP SONG ARB",
    category: "General",
    stage: "On-Stage",
    competitor: "TEAM QAMAR",
    chest: "—",
    team: "TEAM QAMAR",
    position: "2nd",
    grade: "NIL",
    score: 7,
  },
  {
    id: "18",
    program: "GROUP SONG ARB",
    category: "General",
    stage: "On-Stage",
    competitor: "TEAM SURAYYA",
    chest: "—",
    team: "TEAM SURAYYA",
    position: "1st",
    grade: "NIL",
    score: 10,
  },
  {
    id: "19",
    program: "BURDA",
    category: "General",
    stage: "On-Stage",
    competitor: "TEAM SURAYYA",
    chest: "—",
    team: "TEAM SURAYYA",
    position: "2nd",
    grade: "NIL",
    score: 7,
  },
  {
    id: "20",
    program: "BURDA",
    category: "General",
    stage: "On-Stage",
    competitor: "TEAM QAMAR",
    chest: "—",
    team: "TEAM QAMAR",
    position: "1st",
    grade: "NIL",
    score: 10,
  },
];

export const initialStatuses: ProgramStatus[] = [
  "DEBATE",
  "GROUP QUIZ",
  "MOULID RECITING",
  "PROGRAM SETTING",
  "GROUP SONG ARB",
  "BURDA GIRLS",
].map((program, index) => ({
  id: `s${index}`,
  program,
  category: "General",
  stage: "On-Stage",
  status: "Outed",
}));

export const teamTotals = [
  { rank: 1, team: "TEAM SURAYYA", total: 488, onStage: 220, offStage: 268 },
  { rank: 2, team: "TEAM QAMAR", total: 423, onStage: 235, offStage: 188 },
];

export const STORAGE_RESULTS = "noorun-results";
export const STORAGE_STATUSES = "noorun-statuses";
export const STORAGE_COMPETITORS = "noorun-competitors";
export const STORAGE_TEAMS = "mnmf2k26-teams";
export const STORAGE_PROGRAMS = "mnmf2k26-programs";
export const STORAGE_GENERAL_RESULTS = "mnmf2k26-general-results";
export const STORAGE_ADMIN_RESULTS = "mnmf2k26-admin-results";
export const MNMF_DATA_SYNC_EVENT = "mnmf2k26-data-sync";

export type Team = {
  id: string;
  name: string;
};

export type CompetitorRecord = {
  id: string;
  name: string;
  chest_no: string;
  category: string;
  team_id: string;
};

export type ProgramRecord = {
  id: string;
  name: string;
  category: string;
  stage_type: "On-Stage" | "Off-Stage";
};

export type AdminResultRecord = {
  id: string;
  competitor_id: string;
  program_id: string;
  chest_no: string;
  competitor_name: string;
  category: string;
  team_id: string;
  team_name: string | null;
  program_name: string;
  stage_type: "On-Stage" | "Off-Stage";
  position: "1st" | "2nd" | "3rd" | "NIL";
  grade: "A" | "B" | "C" | "NIL";
  score: number;
};

export type GeneralResultRecord = {
  id: string;
  program_id: string;
  program_name: string;
  stage_type: "On-Stage" | "Off-Stage";
  team_id: string;
  team_name: string | null;
  position: "1st" | "2nd" | "3rd" | "NIL";
  grade: "A" | "B" | "C" | "NIL";
  score: number;
};

export const CATEGORIES = ["Kiddies", "Sub-Junior", "Junior", "Senior", "Super Senior"] as const;

export const ALL_CATEGORIES = [
  "Kiddies",
  "Sub-Junior",
  "Junior",
  "Senior",
  "Super Senior",
  "General",
] as const;

export const STAGE_TYPES = ["On-Stage", "Off-Stage"] as const;
export const POSITIONS = ["1st", "2nd", "3rd", "NIL"] as const;
export const GRADES = ["A", "B", "C", "NIL"] as const;

export const initialTeams: Team[] = [
  { id: "team-1", name: "TEAM SURAYYA" },
  { id: "team-2", name: "TEAM QAMAR" },
];

export const initialProgramRecords: ProgramRecord[] = [
  { id: "p1", name: "SONG ARABIC", category: "Super Senior", stage_type: "On-Stage" },
  { id: "p2", name: "SONG MLM SNR", category: "Senior", stage_type: "On-Stage" },
  { id: "p3", name: "HIFZ (G)", category: "Sub-Junior", stage_type: "On-Stage" },
  { id: "p4", name: "HIFZ (G)", category: "Junior", stage_type: "Off-Stage" },
  { id: "p5", name: "HANDWRITING ARB (G)", category: "Junior", stage_type: "Off-Stage" },
  { id: "p6", name: "HANDWRITING ARB MLM (G)", category: "Sub-Junior", stage_type: "Off-Stage" },
  { id: "p7", name: "QIRATH (G)", category: "Junior", stage_type: "Off-Stage" },
  { id: "p8", name: "QIRATH (G)", category: "Sub-Junior", stage_type: "On-Stage" },
  { id: "p9", name: "GROUP SONG ARB", category: "General", stage_type: "On-Stage" },
  { id: "p10", name: "BURDA", category: "General", stage_type: "On-Stage" },
  { id: "p11", name: "DEBATE", category: "General", stage_type: "On-Stage" },
  { id: "p12", name: "GROUP QUIZ", category: "General", stage_type: "On-Stage" },
  { id: "p13", name: "MOULID RECITING", category: "General", stage_type: "On-Stage" },
  { id: "p14", name: "PROGRAM SETTING", category: "General", stage_type: "On-Stage" },
  { id: "p15", name: "BURDA GIRLS", category: "General", stage_type: "On-Stage" },
];

export const initialCompetitorRecords: CompetitorRecord[] = [
  { id: "c1", name: "SIDRA", chest_no: "114", category: "Sub-Junior", team_id: "team-1" },
  { id: "c2", name: "HAYA FATHIMA", chest_no: "121", category: "Junior", team_id: "team-1" },
  { id: "c3", name: "SHAHDIYA FATHIMA", chest_no: "123", category: "Junior", team_id: "team-1" },
  { id: "c4", name: "FATHIMA RIFA", chest_no: "126", category: "Junior", team_id: "team-1" },
  { id: "c5", name: "THASHREEFA", chest_no: "128", category: "Junior", team_id: "team-1" },
  { id: "c6", name: "NAJAD", chest_no: "239", category: "Super Senior", team_id: "team-1" },
  { id: "c7", name: "JAZA SHERIN", chest_no: "314", category: "Sub-Junior", team_id: "team-2" },
  { id: "c8", name: "NAJA FATHIMA", chest_no: "315", category: "Sub-Junior", team_id: "team-2" },
  { id: "c9", name: "ADULA FATHIMA", chest_no: "325", category: "Junior", team_id: "team-2" },
  { id: "c10", name: "ISHAN", chest_no: "401", category: "Senior", team_id: "team-2" },
  { id: "c11", name: "RAZIN MUHAMMED", chest_no: "430", category: "Senior", team_id: "team-2" },
  { id: "c12", name: "SHAMIL", chest_no: "434", category: "Super Senior", team_id: "team-2" },
];

export const initialAdminResults: AdminResultRecord[] = [
  {
    id: "r1",
    competitor_id: "c6",
    program_id: "p1",
    chest_no: "239",
    competitor_name: "NAJAD",
    category: "Super Senior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "SONG ARABIC",
    stage_type: "On-Stage",
    position: "2nd",
    grade: "NIL",
    score: 5,
  },
  {
    id: "r2",
    competitor_id: "c12",
    program_id: "p1",
    chest_no: "434",
    competitor_name: "SHAMIL",
    category: "Super Senior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "SONG ARABIC",
    stage_type: "On-Stage",
    position: "1st",
    grade: "NIL",
    score: 7,
  },
  {
    id: "r2_3",
    competitor_id: "c11",
    program_id: "p1",
    chest_no: "430",
    competitor_name: "RAZIN MUHAMMED",
    category: "Super Senior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "SONG ARABIC",
    stage_type: "On-Stage",
    position: "3rd",
    grade: "NIL",
    score: 3,
  },
  {
    id: "r3_1",
    competitor_id: "c12",
    program_id: "p2",
    chest_no: "434",
    competitor_name: "SHAMIL",
    category: "Senior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "SONG MLM SNR",
    stage_type: "On-Stage",
    position: "1st",
    grade: "NIL",
    score: 7,
  },
  {
    id: "r3",
    competitor_id: "c11",
    program_id: "p2",
    chest_no: "430",
    competitor_name: "RAZIN MUHAMMED",
    category: "Senior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "SONG MLM SNR",
    stage_type: "On-Stage",
    position: "2nd",
    grade: "NIL",
    score: 5,
  },
  {
    id: "r4",
    competitor_id: "c10",
    program_id: "p2",
    chest_no: "401",
    competitor_name: "ISHAN",
    category: "Senior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "SONG MLM SNR",
    stage_type: "On-Stage",
    position: "3rd",
    grade: "NIL",
    score: 3,
  },
  {
    id: "r5",
    competitor_id: "c8",
    program_id: "p3",
    chest_no: "315",
    competitor_name: "NAJA FATHIMA",
    category: "Sub-Junior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "HIFZ (G)",
    stage_type: "On-Stage",
    position: "1st",
    grade: "A",
    score: 10,
  },
  {
    id: "r6",
    competitor_id: "c1",
    program_id: "p3",
    chest_no: "114",
    competitor_name: "SIDRA",
    category: "Sub-Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "HIFZ (G)",
    stage_type: "On-Stage",
    position: "2nd",
    grade: "A",
    score: 8,
  },
  {
    id: "r6_3",
    competitor_id: "c7",
    program_id: "p3",
    chest_no: "314",
    competitor_name: "JAZA SHERIN",
    category: "Sub-Junior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "HIFZ (G)",
    stage_type: "On-Stage",
    position: "3rd",
    grade: "B",
    score: 5,
  },
  {
    id: "r7",
    competitor_id: "c2",
    program_id: "p4",
    chest_no: "121",
    competitor_name: "HAYA FATHIMA",
    category: "Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "HIFZ (G)",
    stage_type: "Off-Stage",
    position: "1st",
    grade: "A",
    score: 10,
  },
  {
    id: "r8",
    competitor_id: "c9",
    program_id: "p4",
    chest_no: "325",
    competitor_name: "ADULA FATHIMA",
    category: "Junior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "HIFZ (G)",
    stage_type: "Off-Stage",
    position: "2nd",
    grade: "A",
    score: 8,
  },
  {
    id: "r8_3",
    competitor_id: "c5",
    program_id: "p4",
    chest_no: "128",
    competitor_name: "THASHREEFA",
    category: "Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "HIFZ (G)",
    stage_type: "Off-Stage",
    position: "3rd",
    grade: "B",
    score: 5,
  },
  {
    id: "r9",
    competitor_id: "c4",
    program_id: "p5",
    chest_no: "126",
    competitor_name: "FATHIMA RIFA",
    category: "Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "HANDWRITING ARB (G)",
    stage_type: "Off-Stage",
    position: "1st",
    grade: "A",
    score: 10,
  },
  {
    id: "r10",
    competitor_id: "c5",
    program_id: "p5",
    chest_no: "128",
    competitor_name: "THASHREEFA",
    category: "Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "HANDWRITING ARB (G)",
    stage_type: "Off-Stage",
    position: "2nd",
    grade: "A",
    score: 8,
  },
  {
    id: "r10_3",
    competitor_id: "c3",
    program_id: "p5",
    chest_no: "123",
    competitor_name: "SHAHDIYA FATHIMA",
    category: "Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "HANDWRITING ARB (G)",
    stage_type: "Off-Stage",
    position: "3rd",
    grade: "B",
    score: 5,
  },
  {
    id: "r11",
    competitor_id: "c1",
    program_id: "p6",
    chest_no: "114",
    competitor_name: "SIDRA",
    category: "Sub-Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "HANDWRITING ARB MLM (G)",
    stage_type: "Off-Stage",
    position: "1st",
    grade: "A",
    score: 10,
  },
  {
    id: "r12",
    competitor_id: "c7",
    program_id: "p6",
    chest_no: "314",
    competitor_name: "JAZA SHERIN",
    category: "Sub-Junior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "HANDWRITING ARB MLM (G)",
    stage_type: "Off-Stage",
    position: "2nd",
    grade: "A",
    score: 8,
  },
  {
    id: "r12_3",
    competitor_id: "c8",
    program_id: "p6",
    chest_no: "315",
    competitor_name: "NAJA FATHIMA",
    category: "Sub-Junior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "HANDWRITING ARB MLM (G)",
    stage_type: "Off-Stage",
    position: "3rd",
    grade: "B",
    score: 5,
  },
  {
    id: "r13",
    competitor_id: "c3",
    program_id: "p7",
    chest_no: "123",
    competitor_name: "SHAHDIYA FATHIMA",
    category: "Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "QIRATH (G)",
    stage_type: "Off-Stage",
    position: "1st",
    grade: "A",
    score: 10,
  },
  {
    id: "r14",
    competitor_id: "c2",
    program_id: "p7",
    chest_no: "121",
    competitor_name: "HAYA FATHIMA",
    category: "Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "QIRATH (G)",
    stage_type: "Off-Stage",
    position: "2nd",
    grade: "A",
    score: 8,
  },
  {
    id: "r14_3",
    competitor_id: "c4",
    program_id: "p7",
    chest_no: "126",
    competitor_name: "FATHIMA RIFA",
    category: "Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "QIRATH (G)",
    stage_type: "Off-Stage",
    position: "3rd",
    grade: "B",
    score: 5,
  },
  {
    id: "r15",
    competitor_id: "c8",
    program_id: "p8",
    chest_no: "315",
    competitor_name: "NAJA FATHIMA",
    category: "Sub-Junior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "QIRATH (G)",
    stage_type: "On-Stage",
    position: "1st",
    grade: "A",
    score: 10,
  },
  {
    id: "r16",
    competitor_id: "c7",
    program_id: "p8",
    chest_no: "314",
    competitor_name: "JAZA SHERIN",
    category: "Sub-Junior",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    program_name: "QIRATH (G)",
    stage_type: "On-Stage",
    position: "2nd",
    grade: "A",
    score: 8,
  },
  {
    id: "r16_3",
    competitor_id: "c1",
    program_id: "p8",
    chest_no: "114",
    competitor_name: "SIDRA",
    category: "Sub-Junior",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    program_name: "QIRATH (G)",
    stage_type: "On-Stage",
    position: "3rd",
    grade: "B",
    score: 5,
  },
];

export const initialGeneralResults: GeneralResultRecord[] = [
  {
    id: "gr1",
    program_id: "p9",
    program_name: "GROUP SONG ARB",
    stage_type: "On-Stage",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    position: "2nd",
    grade: "NIL",
    score: 7,
  },
  {
    id: "gr2",
    program_id: "p9",
    program_name: "GROUP SONG ARB",
    stage_type: "On-Stage",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    position: "1st",
    grade: "NIL",
    score: 10,
  },
  {
    id: "gr3",
    program_id: "p10",
    program_name: "BURDA",
    stage_type: "On-Stage",
    team_id: "team-1",
    team_name: "TEAM SURAYYA",
    position: "2nd",
    grade: "NIL",
    score: 7,
  },
  {
    id: "gr4",
    program_id: "p10",
    program_name: "BURDA",
    stage_type: "On-Stage",
    team_id: "team-2",
    team_name: "TEAM QAMAR",
    position: "1st",
    grade: "NIL",
    score: 10,
  },
];

export type Competitor = {
  chest: string;
  name: string;
  team: string;
  category?: string;
};

export const initialCompetitors: Competitor[] = [
  { chest: "114", name: "SIDRA", team: "TEAM SURAYYA", category: "Sub-Junior" },
  { chest: "121", name: "HAYA FATHIMA", team: "TEAM SURAYYA", category: "Junior" },
  { chest: "123", name: "SHAHDIYA FATHIMA", team: "TEAM SURAYYA", category: "Junior" },
  { chest: "126", name: "FATHIMA RIFA", team: "TEAM SURAYYA", category: "Junior" },
  { chest: "128", name: "THASHREEFA", team: "TEAM SURAYYA", category: "Junior" },
  { chest: "239", name: "NAJAD", team: "TEAM SURAYYA", category: "Super Senior" },
  { chest: "314", name: "JAZA SHERIN", team: "TEAM QAMAR", category: "Sub-Junior" },
  { chest: "315", name: "NAJA FATHIMA", team: "TEAM QAMAR", category: "Sub-Junior" },
  { chest: "325", name: "ADULA FATHIMA", team: "TEAM QAMAR", category: "Junior" },
  { chest: "401", name: "ISHAN", team: "TEAM QAMAR", category: "Senior" },
  { chest: "430", name: "RAZIN MUHAMMED", team: "TEAM QAMAR", category: "Senior" },
  { chest: "434", name: "SHAMIL", team: "TEAM QAMAR", category: "Super Senior" },
];

export type RankedTeam = {
  rank: number;
  team: Team;
  grand: number;
  onStage: number;
  offStage: number;
  categories: Record<string, number>;
};

export function calculateRankedTeams(
  teams: Team[],
  adminResults: AdminResultRecord[],
  generalResults: GeneralResultRecord[],
): RankedTeam[] {
  const list = teams.map((team) => {
    const catTotals: Record<string, number> = Object.fromEntries(ALL_CATEGORIES.map((c) => [c, 0]));
    let onStage = 0;
    let offStage = 0;

    for (const r of adminResults) {
      if (r.team_id !== team.id) continue;
      catTotals[r.category] = (catTotals[r.category] ?? 0) + (Number(r.score) || 0);
      if (r.stage_type === "On-Stage") {
        onStage += Number(r.score) || 0;
      } else {
        offStage += Number(r.score) || 0;
      }
    }

    for (const gr of generalResults) {
      if (gr.team_id !== team.id) continue;
      catTotals["General"] = (catTotals["General"] ?? 0) + (Number(gr.score) || 0);
      if (gr.stage_type === "On-Stage") {
        onStage += Number(gr.score) || 0;
      } else {
        offStage += Number(gr.score) || 0;
      }
    }

    const grand = Object.values(catTotals).reduce((sum, v) => sum + v, 0);

    return {
      team,
      grand,
      onStage,
      offStage,
      categories: catTotals,
    };
  });

  list.sort((a, b) => b.grand - a.grand);

  return list.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
}

export type CategoryTopper = {
  name: string;
  chest: string;
  team: string;
  score: number;
};

export type CategoryToppersGroup = {
  category: string;
  top: CategoryTopper[];
};

export function calculateCategoryToppers(
  categories: readonly string[],
  adminResults: AdminResultRecord[],
): CategoryToppersGroup[] {
  return categories.map((cat) => {
    const map = new Map<string, CategoryTopper>();
    for (const r of adminResults) {
      if (r.category !== cat) continue;
      const key = r.competitor_id || `${r.chest_no}-${r.competitor_name}`;
      const existing = map.get(key);
      const points = Number(r.score) || 0;
      if (existing) {
        existing.score += points;
      } else {
        map.set(key, {
          name: r.competitor_name,
          chest: r.chest_no,
          team: r.team_name ?? "—",
          score: points,
        });
      }
    }
    const sorted = Array.from(map.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    return {
      category: cat,
      top: sorted,
    };
  });
}

export type ProgramStatusRow = {
  id: string;
  name: string;
  category: string;
  stage_type: "On-Stage" | "Off-Stage";
  status: "Outed" | "Pending";
};

export function calculateProgramStatuses(
  programs: ProgramRecord[],
  adminResults: AdminResultRecord[],
  generalResults: GeneralResultRecord[],
): ProgramStatusRow[] {
  const outedKeys = new Set<string>();
  for (const r of adminResults) {
    outedKeys.add(`${r.program_name}|${r.stage_type}`);
  }
  for (const gr of generalResults) {
    outedKeys.add(`${gr.program_name}|${gr.stage_type}`);
  }

  return programs
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      stage_type: p.stage_type,
      status: (outedKeys.has(`${p.name}|${p.stage_type}`) ? "Outed" : "Pending") as
        "Outed" | "Pending",
    }))
    .sort((a, b) => (a.status === "Outed" && b.status !== "Outed" ? -1 : 1));
}

export type UnifiedResultRow = {
  id: string;
  program_name: string;
  category: string;
  stage_type: "On-Stage" | "Off-Stage";
  competitor: string;
  chest_no: string;
  team_name: string;
  position: string;
  grade: string;
  score: number;
};

export function getUnifiedOutedResults(
  adminResults: AdminResultRecord[],
  generalResults: GeneralResultRecord[],
): UnifiedResultRow[] {
  const individual: UnifiedResultRow[] = adminResults.map((r) => ({
    id: r.id,
    program_name: r.program_name,
    category: r.category,
    stage_type: r.stage_type,
    competitor: r.competitor_name,
    chest_no: r.chest_no,
    team_name: r.team_name ?? "—",
    position: r.position,
    grade: r.grade,
    score: Number(r.score) || 0,
  }));

  const general: UnifiedResultRow[] = generalResults.map((gr) => ({
    id: gr.id,
    program_name: gr.program_name,
    category: "General",
    stage_type: gr.stage_type,
    competitor: gr.team_name ?? "—",
    chest_no: "—",
    team_name: gr.team_name ?? "—",
    position: gr.position,
    grade: gr.grade,
    score: Number(gr.score) || 0,
  }));

  return [...individual, ...general];
}
