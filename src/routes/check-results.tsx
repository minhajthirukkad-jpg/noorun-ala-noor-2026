import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { ResultCard } from "@/components/result-card";
import {
  FestivalCalligraphyLogo,
  GuideonInstitutionLogo,
} from "@/components/festival-header-branding";
import { useFestivalData } from "@/hooks/use-festival-data";
import { ALL_CATEGORIES, STAGE_TYPES } from "@/lib/festival-data";

export const Route = createFileRoute("/check-results")({
  head: () => ({
    meta: [
      { title: "Check Results — Noorun Ala Noor Meelad Fest 2026" },
      {
        name: "description",
        content:
          "Search Noorun Ala Noor Meelad Fest 2026 competition results | Guideon Learning Hub.",
      },
      { property: "og:title", content: "Check Results — Noorun Ala Noor" },
      {
        property: "og:description",
        content: "Search the official Noorun Ala Noor Meelad Fest 2026 results.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckResultsPage,
});

const PAGE_SIZE = 20;

function CheckResultsPage() {
  const { outedResults, teams } = useFestivalData();
  const [category, setCategory] = useState("all");
  const [stage, setStage] = useState("all");
  const [team, setTeam] = useState("all");
  const [position, setPosition] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return outedResults.filter((result) => {
      if (category !== "all" && result.category !== category) return false;
      if (stage !== "all" && result.stage_type !== stage) return false;
      if (team !== "all" && result.team_name !== team) return false;
      if (position !== "all" && result.position !== position) return false;
      if (q) {
        const haystack =
          `${result.program_name} ${result.competitor} ${result.chest_no} ${result.team_name}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [outedResults, category, stage, team, position, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  );

  const handleFilterChange = (setter: (val: string) => void, val: string) => {
    setter(val);
    setPage(1);
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6">
      {/* Header */}
      <header className="glass-card mb-6 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <Button asChild size="icon" variant="outline">
            <Link to="/" aria-label="Back to scoreboard">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <FestivalCalligraphyLogo className="size-11 sm:size-12" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Check Results</h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Noorun Ala Noor · Guideon Learning Hub
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
          <GuideonInstitutionLogo className="size-11 sm:size-12" />
        </div>
      </header>

      {/* Filters */}
      <section
        className="glass-card mb-6 grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-5"
        aria-label="Result filters"
      >
        <FilterSelect
          value={category}
          onChange={(v) => handleFilterChange(setCategory, v)}
          label="All Category"
          options={ALL_CATEGORIES as unknown as string[]}
        />
        <FilterSelect
          value={stage}
          onChange={(v) => handleFilterChange(setStage, v)}
          label="All Stage Type"
          options={STAGE_TYPES as unknown as string[]}
        />
        <FilterSelect
          value={team}
          onChange={(v) => handleFilterChange(setTeam, v)}
          label="All Team"
          options={teams.map((t) => t.name)}
        />
        <FilterSelect
          value={position}
          onChange={(v) => handleFilterChange(setPosition, v)}
          label="All Positions"
          options={["1st", "2nd", "3rd"]}
        />
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search name / chest / program"
          />
        </div>
      </section>

      {/* Results List */}
      <section className="space-y-4" aria-live="polite">
        {paginated.length ? (
          <>
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span>Showing {filtered.length} total declared results</span>
              {totalPages > 1 && (
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {paginated.map((result) => (
                <ResultCard key={result.id} result={result} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pt-4 flex justify-center">
                <PaginationBar
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="glass-card p-12 text-center text-sm text-muted-foreground">
            No matching results found.
          </div>
        )}
      </section>
    </main>
  );
}

function FilterSelect({
  value,
  onChange,
  label,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: string[];
}) {
  return (
    <select
      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={label}
    >
      <option value="all">{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
