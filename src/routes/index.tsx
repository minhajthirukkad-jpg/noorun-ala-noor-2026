import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BellRing,
  CheckCircle2,
  Clock3,
  Crown,
  Lock,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FestivalCalligraphyLogo,
  GuideonInstitutionLogo,
} from "@/components/festival-header-branding";
import { SecretRankModal } from "@/components/secret-rank-modal";
import { useFestivalData } from "@/hooks/use-festival-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noorun Ala Noor — Meelad Fest 2026 Scoreboard" },
      {
        name: "description",
        content:
          "Live scores, rankings, and outed results for Noorun Ala Noor Meelad Fest 2026 | Guideon Learning Hub.",
      },
      { property: "og:title", content: "Noorun Ala Noor — Meelad Fest 2026" },
      {
        property: "og:description",
        content:
          "Official live scoreboard and rankings for Noorun Ala Noor - Guideon Learning Hub.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const { teams, rankedTeams, outedResults, programStatuses, categoryToppers, tickerItems } =
    useFestivalData();

  const [secretModalOpen, setSecretModalOpen] = useState(false);

  // Trigger surprising secret rank reveal animation on first site opening in this session
  useEffect(() => {
    const hasSeen = sessionStorage.getItem("mnmf2k26-secret-reveal-seen");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setSecretModalOpen(true);
        sessionStorage.setItem("mnmf2k26-secret-reveal-seen", "true");
      }, 450);
      return () => clearTimeout(timer);
    }
  }, []);

  const highestScore = useMemo(
    () => Math.max(...rankedTeams.map((t) => t.grand), 1),
    [rankedTeams],
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Secret Rank Opening Modal */}
      <SecretRankModal
        isOpen={secretModalOpen}
        onClose={() => setSecretModalOpen(false)}
        rankedTeams={rankedTeams}
        highestScore={highestScore}
      />

      {/* Redesigned Header with Festival Logo, Title, and Institution Logo */}
      <header className="glass-card mb-6 relative overflow-hidden border border-border/80 p-5 sm:p-7 shadow-xl">
        {/* Subtle decorative background ambient glow */}
        <div className="pointer-events-none absolute -left-12 -top-12 size-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 -bottom-12 size-48 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Festival Logo */}
          <div className="flex justify-center sm:justify-start">
            <FestivalCalligraphyLogo className="size-20 sm:size-24 md:size-28" />
          </div>

          {/* Center: Redesigned Title & Subtitle */}
          <div className="flex-1 text-center px-2">
            <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-500 sm:text-xs">
              <Sparkles className="size-3 text-amber-400" />
              <span>Meelad Fest 2026</span>
              <Sparkles className="size-3 text-amber-400" />
            </div>

            <h1 className="mt-2 bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-4xl md:text-5xl drop-shadow-sm font-display">
              NOORUN ALA NOOR
            </h1>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 sm:text-sm">
                guideon learning hub
              </p>
            </div>
          </div>

          {/* Right: Institution Logo & Quick Actions */}
          <div className="flex flex-col items-center gap-3 sm:items-end">
            <GuideonInstitutionLogo className="size-20 sm:size-24 md:size-28" />
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSecretModalOpen(true)}
                title="Open Secret Rank Table Reveal"
                className="border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 text-xs font-bold gap-1 shadow-sm"
              >
                <Crown className="size-3.5" />
                <span>Reveal Standings</span>
              </Button>
              <Button asChild variant="outline" size="sm" title="Admin panel">
                <Link to="/admin">
                  <Lock className="size-3.5 mr-1" />
                  <span className="text-xs">Admin</span>
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                <Link to="/check-results">
                  <Search className="size-3.5 mr-1.5" />
                  <span className="text-xs font-semibold">Results</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Ticker / Marquee with smooth continuous scrolling animation */}
      {tickerItems.length > 0 && (
        <section
          className="glass-card mb-6 flex items-stretch overflow-hidden p-0 shadow-md"
          aria-label="Latest Results Ticker"
        >
          <div className="flex shrink-0 items-center gap-2 border-r border-border/60 bg-primary/10 px-3.5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary z-10 shadow-sm">
            <BellRing className="size-4 animate-pulse text-amber-500" />
            <span className="hidden sm:inline">Latest Result Out</span>
          </div>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
            <div className="animate-ticker flex w-max items-center gap-8 py-2.5 pl-6">
              {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
                <span
                  key={`${item.programName}-${item.stageType}-${idx}`}
                  className="flex items-center gap-2 whitespace-nowrap text-sm text-foreground/80"
                >
                  <span className="text-amber-500 font-bold">★</span>
                  <span className="font-semibold text-foreground">{item.programName}</span>
                  <span className="text-xs text-muted-foreground">({item.stageType})</span>
                  {item.first && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      <Trophy className="size-3 text-amber-500" /> 1st: {item.first.name}
                    </span>
                  )}
                  {item.second && (
                    <span className="flex items-center gap-1 rounded-full bg-slate-500/15 px-2.5 py-0.5 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-500/30">
                      <Award className="size-3 text-slate-400" /> 2nd: {item.second.name}
                    </span>
                  )}
                  {item.third && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-900/15 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:text-amber-300 border border-amber-800/30">
                      <Award className="size-3 text-amber-700 dark:text-amber-400" /> 3rd:{" "}
                      {item.third.name}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="space-y-8">
        {/* 1. Rank Table */}
        <section className="glass-card p-5" aria-label="Team Scoreboard">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Trophy className="size-5 text-amber-500" />
              <h2 className="text-lg font-semibold">Rank Table</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSecretModalOpen(true)}
              className="border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 text-xs font-semibold gap-1.5"
            >
              <Crown className="size-3.5" /> Secret Reveal Modal
            </Button>
          </div>

          {teams.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No teams added yet. Add teams in the Admin Panel to start tracking scores.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">Total Score</TableHead>
                    <TableHead className="hidden text-right sm:table-cell">On-Stage</TableHead>
                    <TableHead className="hidden text-right sm:table-cell">Off-Stage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankedTeams.map((row) => (
                    <TableRow key={row.team.id}>
                      <TableCell className="font-semibold text-base">{row.rank}</TableCell>
                      <TableCell className="font-medium">
                        <span className="text-sm font-semibold">{row.team.name}</span>
                        <div className="mt-1.5 block h-2 w-full max-w-sm overflow-hidden rounded-full bg-muted/60">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-all duration-500"
                            style={{
                              width: `${Math.max((row.grand / highestScore) * 100, 2)}%`,
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold text-base tabular-nums text-primary">
                        {row.grand}
                      </TableCell>
                      <TableCell className="hidden text-right tabular-nums sm:table-cell">
                        {row.onStage}
                      </TableCell>
                      <TableCell className="hidden text-right tabular-nums sm:table-cell">
                        {row.offStage}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        {/* 2. Outed Result Table */}
        <section className="glass-card p-5" aria-label="Outed Results">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="size-5 text-primary" />
            <h2 className="text-lg font-semibold">Outed Result Table</h2>
          </div>

          {outedResults.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No results declared yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead className="hidden sm:table-cell">Stage</TableHead>
                    <TableHead>Competitor / Team</TableHead>
                    <TableHead className="text-right">Position</TableHead>
                    <TableHead className="text-right">Grade</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outedResults.slice(0, 20).map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.program_name}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {r.category}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {r.stage_type}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{r.competitor}</span>
                        {r.chest_no !== "—" && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            (#{r.chest_no})
                          </span>
                        )}
                        <p className="text-xs text-muted-foreground">{r.team_name}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                          {r.position}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">{r.grade}</TableCell>
                      <TableCell className="text-right font-bold tabular-nums text-primary">
                        {r.score}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        {/* 3. Program Status Table */}
        <section className="glass-card p-5" aria-label="Program Status">
          <div className="mb-4 flex items-center gap-2">
            <Clock3 className="size-5 text-primary" />
            <h2 className="text-lg font-semibold">Program Status Table</h2>
          </div>

          {programStatuses.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No programs added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead className="hidden sm:table-cell">Stage</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programStatuses.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {p.category}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {p.stage_type}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            p.status === "Outed"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {p.status === "Outed" ? (
                            <>
                              <CheckCircle2 className="size-3" /> Outed
                            </>
                          ) : (
                            <>
                              <Clock3 className="size-3" /> Pending
                            </>
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        {/* 4. Category Toppers */}
        <section className="glass-card p-5" aria-label="Category Toppers">
          <div className="mb-4 flex items-center gap-2">
            <Award className="size-5 text-gold" />
            <h2 className="text-lg font-semibold">Toppers</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryToppers.map(({ category, top }) => (
              <div key={category} className="rounded-xl border border-border bg-background/60 p-4">
                <h3 className="mb-3 text-base font-semibold text-primary">{category}</h3>
                {top.length === 0 ? (
                  <p className="py-2 text-sm text-muted-foreground">No results yet.</p>
                ) : (
                  <ol className="space-y-2">
                    {top.map((t, idx) => (
                      <li
                        key={`${t.chest}-${t.name}-${idx}`}
                        className="flex items-center gap-3 rounded-lg border border-border bg-background/60 px-3 py-2"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {t.name}{" "}
                            <span className="text-xs text-muted-foreground">(#{t.chest})</span>
                          </p>
                          <p className="truncate text-xs text-muted-foreground">{t.team}</p>
                        </div>
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                          {t.score} pts
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
