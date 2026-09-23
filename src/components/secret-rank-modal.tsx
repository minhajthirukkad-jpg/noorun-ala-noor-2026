import React, { useEffect, useState } from "react";
import { Award, Crown, Eye, Flame, RotateCcw, Sparkles, Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FestivalCalligraphyLogo, GuideonInstitutionLogo } from "./festival-header-branding";
import type { TeamRank } from "@/lib/festival-data";

interface SecretRankModalProps {
  isOpen: boolean;
  onClose: () => void;
  rankedTeams: TeamRank[];
  highestScore: number;
}

export function SecretRankModal({
  isOpen,
  onClose,
  rankedTeams,
  highestScore,
}: SecretRankModalProps) {
  // Phase 1: 'vault' (the dramatic locked secret opening), Phase 2: 'revealed' (the glorious standings)
  const [phase, setPhase] = useState<"vault" | "revealed">("vault");
  const [countdown, setCountdown] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setPhase("vault");
      setCountdown(3);
      setShowConfetti(false);
      return;
    }

    // Dramatic auto-countdown sequence
    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(timer);
        triggerReveal();
      }
    }, 850);

    return () => clearInterval(timer);
  }, [isOpen]);

  const triggerReveal = () => {
    setPhase("revealed");
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4500);
  };

  const handleReplay = () => {
    setPhase("vault");
    setCountdown(3);
    setShowConfetti(false);
    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(timer);
        triggerReveal();
      }
    }, 850);
  };

  if (!isOpen) return null;

  const topThree = rankedTeams.slice(0, 3);
  const leader = rankedTeams[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
    >
      {/* Celebration Confetti Particles when revealed */}
      {showConfetti && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
          {Array.from({ length: 48 }).map((_, i) => {
            const left = `${(i * 100) / 48}%`;
            const delay = `${(i % 8) * 0.15}s`;
            const duration = `${2.2 + (i % 5) * 0.4}s`;
            const colors = [
              "#F59E0B",
              "#10B981",
              "#EF4444",
              "#3B82F6",
              "#EC4899",
              "#8B5CF6",
              "#FBBF24",
            ];
            const color = colors[i % colors.length];
            const size = 6 + (i % 6) * 2;
            return (
              <span
                key={i}
                className="absolute top-0 rounded-sm animate-confetti"
                style={{
                  left,
                  width: `${size}px`,
                  height: `${size * 1.5}px`,
                  backgroundColor: color,
                  animationDelay: delay,
                  animationDuration: duration,
                  opacity: 0.9,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Main Secret Container */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white shadow-[0_0_50px_rgba(245,158,11,0.3)] my-auto max-h-[92vh] flex flex-col">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-amber-500/20 blur-3xl" />

        {/* Header close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        {/* PHASE 1: VAULT / REVEAL COUNTDOWN */}
        {phase === "vault" && (
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center animate-in zoom-in-95 duration-500">
            {/* Medallion with pulsing aura */}
            <div className="relative mb-6 flex size-32 items-center justify-center sm:size-40">
              <div className="absolute inset-0 rounded-full border border-amber-400/40 animate-ping opacity-25" />
              <div className="absolute -inset-2 rounded-full border-2 border-dashed border-amber-400/60 animate-spin [animation-duration:14s]" />
              <div className="relative z-10 flex size-28 items-center justify-center rounded-full bg-gradient-to-b from-amber-400 via-yellow-600 to-amber-800 p-1 shadow-[0_0_30px_rgba(245,158,11,0.6)] sm:size-36">
                <div className="flex size-full items-center justify-center rounded-full bg-neutral-950 p-2">
                  <FestivalCalligraphyLogo className="size-20 sm:size-24" />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              <Sparkles className="size-3.5" />
              <span>Surprise Standings Reveal</span>
              <Sparkles className="size-3.5" />
            </div>

            <h2 className="mt-3 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-4xl font-display">
              NOORUN ALA NOOR 2026
            </h2>

            <p className="mt-1 text-xs uppercase tracking-widest text-emerald-400 font-semibold sm:text-sm">
              guideon learning hub
            </p>

            <p className="mt-4 max-w-md text-xs sm:text-sm text-neutral-300">
              Opening secret live leaderboard vault. Standings are being calculated...
            </p>

            {/* Countdown or manual button */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-500/20 text-xl font-extrabold text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse">
                {countdown > 0 ? countdown : "🔥"}
              </div>

              <Button
                onClick={triggerReveal}
                className="mt-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 font-bold text-neutral-950 shadow-lg hover:from-amber-400 hover:to-amber-500"
              >
                <Flame className="size-4 mr-1.5 fill-current" /> Open Secret Table Now
              </Button>
            </div>
          </div>
        )}

        {/* PHASE 2: SECRET REVEALED RANK TABLE */}
        {phase === "revealed" && (
          <div className="flex flex-col overflow-y-auto p-5 sm:p-7 animate-in zoom-in-95 fade-in duration-500">
            {/* Top Bar with Brand Badges */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <FestivalCalligraphyLogo className="size-12 sm:size-14" />
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    <Crown className="size-3.5" /> Secret Rank Unveiled
                  </div>
                  <h2 className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-xl font-black text-transparent sm:text-2xl font-display">
                    NOORUN ALA NOOR
                  </h2>
                </div>
              </div>
              <div className="hidden sm:block">
                <GuideonInstitutionLogo className="size-12 sm:size-14" />
              </div>
            </div>

            {/* Top 3 Championship Podium Cards */}
            {topThree.length > 0 && (
              <div className="my-5 grid grid-cols-3 gap-2 sm:gap-4">
                {/* 2nd Place */}
                {topThree[1] ? (
                  <div className="flex flex-col items-center rounded-2xl border border-slate-400/30 bg-gradient-to-b from-slate-800/60 to-slate-900/90 p-2.5 sm:p-4 text-center order-1 sm:mt-4">
                    <div className="flex size-8 items-center justify-center rounded-full bg-slate-300/20 text-slate-200 font-extrabold text-xs sm:size-10 sm:text-sm">
                      #2
                    </div>
                    <Award className="size-5 sm:size-6 text-slate-300 my-1" />
                    <span className="truncate w-full text-xs sm:text-sm font-bold text-white">
                      {topThree[1].team.name}
                    </span>
                    <span className="mt-1 text-base sm:text-xl font-black text-slate-200 tabular-nums">
                      {topThree[1].grand}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Points
                    </span>
                  </div>
                ) : (
                  <div className="order-1" />
                )}

                {/* 1st Place Champion */}
                {leader ? (
                  <div className="relative flex flex-col items-center rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-950/80 via-yellow-950/60 to-neutral-950 p-3 sm:p-5 text-center order-2 -mt-2 shadow-[0_0_25px_rgba(245,158,11,0.35)]">
                    <div className="absolute -top-3 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-black flex items-center gap-1 shadow">
                      <Crown className="size-3 fill-current" /> Leader
                    </div>
                    <div className="mt-1 flex size-9 items-center justify-center rounded-full bg-amber-400 text-neutral-950 font-black text-sm sm:size-11 sm:text-base shadow">
                      #1
                    </div>
                    <Trophy className="size-6 sm:size-7 text-amber-300 my-1 fill-amber-400/20 animate-bounce" />
                    <span className="truncate w-full text-xs sm:text-base font-black text-amber-200">
                      {leader.team.name}
                    </span>
                    <span className="mt-1 text-xl sm:text-3xl font-black text-amber-300 tabular-nums">
                      {leader.grand}
                    </span>
                    <span className="text-[10px] text-amber-400/80 uppercase tracking-widest font-bold">
                      Grand Total
                    </span>
                  </div>
                ) : null}

                {/* 3rd Place */}
                {topThree[2] ? (
                  <div className="flex flex-col items-center rounded-2xl border border-amber-700/30 bg-gradient-to-b from-amber-950/40 to-neutral-900/90 p-2.5 sm:p-4 text-center order-3 sm:mt-6">
                    <div className="flex size-8 items-center justify-center rounded-full bg-amber-700/30 text-amber-300 font-extrabold text-xs sm:size-10 sm:text-sm">
                      #3
                    </div>
                    <Award className="size-5 sm:size-6 text-amber-600 my-1" />
                    <span className="truncate w-full text-xs sm:text-sm font-bold text-white">
                      {topThree[2].team.name}
                    </span>
                    <span className="mt-1 text-base sm:text-xl font-black text-amber-200/90 tabular-nums">
                      {topThree[2].grand}
                    </span>
                    <span className="text-[10px] text-amber-600/80 uppercase tracking-wider">
                      Points
                    </span>
                  </div>
                ) : (
                  <div className="order-3" />
                )}
              </div>
            )}

            {/* Complete Rank Table List */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="w-14 text-white/70">Rank</TableHead>
                    <TableHead className="text-white/70">Team</TableHead>
                    <TableHead className="text-right text-white/70">On-Stage</TableHead>
                    <TableHead className="text-right text-white/70">Off-Stage</TableHead>
                    <TableHead className="text-right text-white font-bold">Total Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankedTeams.map((row) => (
                    <TableRow
                      key={row.team.id}
                      className={`border-white/5 transition-colors ${
                        row.rank === 1
                          ? "bg-amber-500/10 font-bold hover:bg-amber-500/15"
                          : row.rank === 2
                            ? "bg-slate-500/10 hover:bg-slate-500/15"
                            : row.rank === 3
                              ? "bg-amber-800/10 hover:bg-amber-800/15"
                              : "hover:bg-white/5"
                      }`}
                    >
                      <TableCell className="font-extrabold text-sm sm:text-base">
                        {row.rank === 1 ? (
                          <span className="inline-flex size-6 items-center justify-center rounded-full bg-amber-400 text-black font-black text-xs">
                            1
                          </span>
                        ) : row.rank === 2 ? (
                          <span className="inline-flex size-6 items-center justify-center rounded-full bg-slate-300 text-black font-black text-xs">
                            2
                          </span>
                        ) : row.rank === 3 ? (
                          <span className="inline-flex size-6 items-center justify-center rounded-full bg-amber-700 text-white font-black text-xs">
                            3
                          </span>
                        ) : (
                          `#${row.rank}`
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-white text-xs sm:text-sm">
                          {row.team.name}
                        </span>
                        <div className="mt-1 block h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300"
                            style={{
                              width: `${Math.max((row.grand / Math.max(highestScore, 1)) * 100, 4)}%`,
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-xs sm:text-sm text-neutral-300">
                        {row.onStage}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-xs sm:text-sm text-neutral-300">
                        {row.offStage}
                      </TableCell>
                      <TableCell className="text-right font-black tabular-nums text-sm sm:text-base text-amber-300">
                        {row.grand}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReplay}
                className="border-white/20 text-white hover:bg-white/10 gap-1.5"
              >
                <RotateCcw className="size-3.5" /> Replay Reveal
              </Button>

              <Button
                size="sm"
                onClick={onClose}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 font-bold text-neutral-950 shadow-md hover:from-amber-400 hover:to-yellow-400"
              >
                <Eye className="size-3.5 mr-1.5" /> Explore Full Scoreboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
