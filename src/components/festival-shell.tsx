import { Link } from "@tanstack/react-router";
import { ClipboardCheck, ShieldAlert, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FestivalShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="festival-panel mb-5 flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          <Link to="/" className="min-w-0">
            <h1 className="font-display text-2xl font-extrabold uppercase sm:text-3xl">
              NOORUN ALA NOOR
            </h1>
            <p className="mt-1 text-xs font-semibold tracking-[0.22em] text-primary">
              MEELAD FEST 2026
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              NURUL HUDA MADRASSA - CHATHANALLOOR
            </p>
          </Link>
          <nav className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" className="border-primary/30 hover:border-primary">
              <Link to="/admin" aria-label="Admin panel">
                <ShieldAlert className="size-4 text-primary" />
                <span>Admin Panel</span>
              </Link>
            </Button>
            <Button asChild>
              <Link to="/check-results">
                <ClipboardCheck className="size-4" />
                <span>Check Results</span>
              </Link>
            </Button>
          </nav>
        </header>
        {children}
        <footer className="py-10 text-center text-xs text-muted-foreground">
          <Trophy className="mx-auto mb-2 size-4 text-highlight" />
          <p className="font-semibold text-foreground">NOORUN ALA NOOR · MEELAD FEST 2026</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link to="/" className="hover:underline">
              Scoreboard
            </Link>
            <span>•</span>
            <Link to="/check-results" className="hover:underline">
              Check Results
            </Link>
            <span>•</span>
            <Link to="/admin" className="text-primary hover:underline">
              Admin Panel
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
