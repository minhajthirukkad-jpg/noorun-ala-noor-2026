import { Award, Trophy } from "lucide-react";
import type { Result, UnifiedResultRow } from "@/lib/festival-data";

export function ResultCard({ result }: { result: Result | UnifiedResultRow }) {
  const program = "program_name" in result ? result.program_name : result.program;
  const stage = "stage_type" in result ? result.stage_type : result.stage;
  const chest = "chest_no" in result ? result.chest_no : result.chest;
  const team = "team_name" in result ? result.team_name : result.team;

  const pos = result.position;

  return (
    <article className="glass-card p-5 border border-border/80 transition-all hover:border-primary/40 shadow-sm hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-sm font-bold text-foreground">{program}</h2>
          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {result.category}
          </span>
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {stage}
          </span>
        </div>

        {pos && pos !== "NIL" && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold shadow-sm ${
              pos === "1st"
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                : pos === "2nd"
                  ? "bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/30"
                  : pos === "3rd"
                    ? "bg-amber-800/15 text-amber-800 dark:text-amber-300 border border-amber-700/40"
                    : "bg-secondary text-secondary-foreground"
            }`}
          >
            {pos === "1st" ? (
              <Trophy className="size-3 text-amber-500" />
            ) : pos === "2nd" ? (
              <Award className="size-3 text-slate-400" />
            ) : pos === "3rd" ? (
              <Award className="size-3 text-amber-700 dark:text-amber-400" />
            ) : null}
            {pos} Position
          </span>
        )}
      </div>

      <dl className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3">
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Competitor</dt>
          <dd className="mt-0.5 text-xs font-bold text-foreground truncate">{result.competitor}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Chest No</dt>
          <dd className="mt-0.5 text-xs font-mono font-bold text-primary">
            {chest !== "—" ? `#${chest}` : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Team</dt>
          <dd className="mt-0.5 text-xs font-bold text-muted-foreground truncate">{team}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Position</dt>
          <dd className="mt-0.5">
            <span
              className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-bold ${
                pos === "1st"
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                  : pos === "2nd"
                    ? "bg-slate-500/20 text-slate-700 dark:text-slate-300"
                    : pos === "3rd"
                      ? "bg-amber-800/20 text-amber-800 dark:text-amber-300"
                      : "bg-muted text-muted-foreground"
              }`}
            >
              {pos}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Grade</dt>
          <dd className="mt-0.5 text-xs font-bold">{result.grade}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</dt>
          <dd className="mt-0.5 text-xs font-black text-primary tabular-nums">
            {result.score} pts
          </dd>
        </div>
      </dl>
    </article>
  );
}
