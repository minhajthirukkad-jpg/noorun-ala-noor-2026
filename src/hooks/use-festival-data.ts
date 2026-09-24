import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CATEGORIES,
  calculateCategoryToppers,
  calculateProgramStatuses,
  calculateRankedTeams,
  getUnifiedOutedResults,
  initialAdminResults,
  initialCompetitorRecords,
  initialGeneralResults,
  initialProgramRecords,
  initialResults,
  initialStatuses,
  initialTeams,
  MNMF_DATA_SYNC_EVENT,
  STORAGE_ADMIN_RESULTS,
  STORAGE_COMPETITORS,
  STORAGE_GENERAL_RESULTS,
  STORAGE_PROGRAMS,
  STORAGE_RESULTS,
  STORAGE_STATUSES,
  STORAGE_TEAMS,
  type AdminResultRecord,
  type CompetitorRecord,
  type GeneralResultRecord,
  type ProgramRecord,
  type ProgramStatus,
  type Result,
  type Team,
} from "@/lib/festival-data";

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (err) {
    console.error(`Failed to read key "${key}" from localStorage:`, err);
    return fallback;
  }
}

export function useFestivalData() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [competitors, setCompetitors] = useState<CompetitorRecord[]>(initialCompetitorRecords);
  const [programs, setPrograms] = useState<ProgramRecord[]>(initialProgramRecords);
  const [adminResults, setAdminResults] = useState<AdminResultRecord[]>(initialAdminResults);
  const [generalResults, setGeneralResults] =
    useState<GeneralResultRecord[]>(initialGeneralResults);
  const [results, setResults] = useState<Result[]>(initialResults);
  const [statuses, setStatuses] = useState<ProgramStatus[]>(initialStatuses);

  const reloadAll = useCallback(() => {
    setTeams(loadFromStorage(STORAGE_TEAMS, initialTeams));
    setCompetitors(loadFromStorage(STORAGE_COMPETITORS, initialCompetitorRecords));
    setPrograms(loadFromStorage(STORAGE_PROGRAMS, initialProgramRecords));
    setAdminResults(loadFromStorage(STORAGE_ADMIN_RESULTS, initialAdminResults));
    setGeneralResults(loadFromStorage(STORAGE_GENERAL_RESULTS, initialGeneralResults));
    setResults(loadFromStorage(STORAGE_RESULTS, initialResults));
    setStatuses(loadFromStorage(STORAGE_STATUSES, initialStatuses));
  }, []);

  useEffect(() => {
    // Initial sync
    reloadAll();

    const handleSync = () => {
      reloadAll();
    };

    window.addEventListener(MNMF_DATA_SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener(MNMF_DATA_SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [reloadAll]);

  const notifyChange = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(MNMF_DATA_SYNC_EVENT));
    }
  };

  const saveTeams = (next: Team[]) => {
    setTeams(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_TEAMS, JSON.stringify(next));
      notifyChange();
    }
  };

  const saveCompetitors = (next: CompetitorRecord[]) => {
    setCompetitors(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_COMPETITORS, JSON.stringify(next));
      notifyChange();
    }
  };

  const savePrograms = (next: ProgramRecord[]) => {
    setPrograms(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_PROGRAMS, JSON.stringify(next));
      notifyChange();
    }
  };

  const saveAdminResults = (next: AdminResultRecord[]) => {
    setAdminResults(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_ADMIN_RESULTS, JSON.stringify(next));

      // Also mirror to legacy results structure
      const legacyMapped: Result[] = next.map((r) => ({
        id: r.id,
        program: r.program_name,
        category: r.category,
        stage: r.stage_type,
        competitor: r.competitor_name,
        chest: r.chest_no,
        team: r.team_name ?? "Independent",
        position: (r.position === "NIL" ? "3rd" : r.position) as "1st" | "2nd" | "3rd",
        grade: r.grade,
        score: Number(r.score) || 0,
      }));
      setResults(legacyMapped);
      window.localStorage.setItem(STORAGE_RESULTS, JSON.stringify(legacyMapped));

      notifyChange();
    }
  };

  const saveGeneralResults = (next: GeneralResultRecord[]) => {
    setGeneralResults(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_GENERAL_RESULTS, JSON.stringify(next));
      notifyChange();
    }
  };

  const saveResults = (next: Result[]) => {
    setResults(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_RESULTS, JSON.stringify(next));
      notifyChange();
    }
  };

  const saveStatuses = (next: ProgramStatus[]) => {
    setStatuses(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_STATUSES, JSON.stringify(next));
      notifyChange();
    }
  };

  // Dynamic calculated data
  const rankedTeams = useMemo(
    () => calculateRankedTeams(teams, adminResults, generalResults),
    [teams, adminResults, generalResults],
  );

  const categoryToppers = useMemo(
    () => calculateCategoryToppers(CATEGORIES, adminResults),
    [adminResults],
  );

  const programStatuses = useMemo(
    () => calculateProgramStatuses(programs, adminResults, generalResults),
    [programs, adminResults, generalResults],
  );

  const outedResults = useMemo(
    () => getUnifiedOutedResults(adminResults, generalResults),
    [adminResults, generalResults],
  );

  // Top ticker items (programs with declared 1st, 2nd, or 3rd positions)
  const tickerItems = useMemo(() => {
    type WinnerSlot = { name: string; kind: "individual" | "general" };
    type TickerEntry = {
      programName: string;
      stageType: string;
      first?: WinnerSlot;
      second?: WinnerSlot;
      third?: WinnerSlot;
    };

    const map = new Map<string, TickerEntry>();

    for (const r of adminResults) {
      const key = `${r.program_name}|${r.stage_type}`;
      const entry = map.get(key) || {
        programName: r.program_name,
        stageType: r.stage_type,
      };
      if (r.position === "1st" && !entry.first) {
        entry.first = { name: r.competitor_name, kind: "individual" };
      }
      if (r.position === "2nd" && !entry.second) {
        entry.second = { name: r.competitor_name, kind: "individual" };
      }
      if (r.position === "3rd" && !entry.third) {
        entry.third = { name: r.competitor_name, kind: "individual" };
      }
      map.set(key, entry);
    }

    for (const gr of generalResults) {
      const key = `${gr.program_name}|${gr.stage_type}`;
      const entry = map.get(key) || {
        programName: gr.program_name,
        stageType: gr.stage_type,
      };
      if (gr.position === "1st" && !entry.first) {
        entry.first = { name: gr.team_name ?? "—", kind: "general" };
      }
      if (gr.position === "2nd" && !entry.second) {
        entry.second = { name: gr.team_name ?? "—", kind: "general" };
      }
      if (gr.position === "3rd" && !entry.third) {
        entry.third = { name: gr.team_name ?? "—", kind: "general" };
      }
      map.set(key, entry);
    }

    return Array.from(map.values()).filter((e) => e.first || e.second || e.third);
  }, [adminResults, generalResults]);

  const resetAllData = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_TEAMS);
      window.localStorage.removeItem(STORAGE_COMPETITORS);
      window.localStorage.removeItem(STORAGE_PROGRAMS);
      window.localStorage.removeItem(STORAGE_ADMIN_RESULTS);
      window.localStorage.removeItem(STORAGE_GENERAL_RESULTS);
      window.localStorage.removeItem(STORAGE_RESULTS);
      window.localStorage.removeItem(STORAGE_STATUSES);
    }
    setTeams(initialTeams);
    setCompetitors(initialCompetitorRecords);
    setPrograms(initialProgramRecords);
    setAdminResults(initialAdminResults);
    setGeneralResults(initialGeneralResults);
    setResults(initialResults);
    setStatuses(initialStatuses);
    notifyChange();
  };

  const exportAllData = () => {
    const backup = {
      version: "2026.1",
      exportedAt: new Date().toISOString(),
      teams,
      competitors,
      programs,
      adminResults,
      generalResults,
      results,
      statuses,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `noorun-ala-noor-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importAllData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (!data) return false;
      if (Array.isArray(data.teams)) saveTeams(data.teams);
      if (Array.isArray(data.competitors)) saveCompetitors(data.competitors);
      if (Array.isArray(data.programs)) savePrograms(data.programs);
      if (Array.isArray(data.adminResults)) saveAdminResults(data.adminResults);
      if (Array.isArray(data.generalResults)) saveGeneralResults(data.generalResults);
      if (Array.isArray(data.statuses)) saveStatuses(data.statuses);
      return true;
    } catch {
      return false;
    }
  };

  return {
    teams,
    competitors,
    programs,
    adminResults,
    generalResults,
    results,
    statuses,
    rankedTeams,
    categoryToppers,
    programStatuses,
    outedResults,
    tickerItems,
    saveTeams,
    saveCompetitors,
    savePrograms,
    saveAdminResults,
    saveGeneralResults,
    saveResults,
    saveStatuses,
    resetAllData,
    exportAllData,
    importAllData,
    reloadAll,
  };
}
