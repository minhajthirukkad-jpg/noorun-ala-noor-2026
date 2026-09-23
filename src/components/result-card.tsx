import type { Result, UnifiedResultRow } from "@/lib/festival-data";

export function ResultCard({ result }: { result: Result | UnifiedResultRow }) {
  const program = "program_name" in result ? result.program_name : result.program;
  const stage = "stage_type" in result ? result.stage_type : result.stage;
  const chest = "chest_no" in result ? result.chest_no : result.chest;
  const team = "team_name" in result ? result.team_name : result.team;

  return (
    <article className="glass-card p-5">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h2 className="mr-1 font-display text-sm font-bold">{program}</h2>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          {result.category}
        </span>
        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          {stage}
        </span>
      </div>
      <dl className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
        {[
          ["Competitor", result.competitor],
          ["Chest No", chest],
          ["Team", team],
          ["Position", result.position],
          ["Grade", result.grade],
          ["Score", String(result.score)],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-[10px] uppercase text-muted-foreground">{label}</dt>
            <dd className="mt-0.5 text-xs font-bold">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
