import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, KeyRound, LockKeyhole, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkAdminPassword, DEFAULT_FEST_PASSWORD, setAdminUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/unlock")({
  head: () => ({
    meta: [
      { title: "Admin Access — Noorun Ala Noor" },
      { name: "description", content: "Secure administration access for Noorun Ala Noor." },
      { property: "og:title", content: "Admin Access — Noorun Ala Noor" },
      { property: "og:description", content: "Secure festival administration access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Unlock,
});

function Unlock() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function performUnlock(pwdToUse?: string) {
    const p = (pwdToUse ?? password).trim();
    setError(false);
    if (checkAdminPassword(p)) {
      setAdminUnlocked(true);
      void router.navigate({ to: "/admin" });
    } else {
      setError(true);
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    performUnlock();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background p-5">
      <div className="festival-panel w-full max-w-md p-7 text-center shadow-lg">
        <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-secondary text-primary">
          <LockKeyhole className="size-6" />
        </span>
        <h1 className="font-display text-2xl font-bold">Admin Panel</h1>
        <p className="mb-5 mt-1 text-sm text-muted-foreground">
          Enter the password to access Noorun Ala Noor festival administration.
        </p>

        <form onSubmit={submit} className="space-y-3">
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-sm font-medium text-destructive">
              Incorrect password. Default password is{" "}
              <span className="font-mono font-bold">{DEFAULT_FEST_PASSWORD}</span>.
            </p>
          )}
          <Button className="w-full" type="submit">
            Unlock Admin Panel
          </Button>
        </form>

        <div className="mt-5 rounded-md border border-primary/20 bg-primary/5 p-3 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <KeyRound className="size-4" />
            <span>Admin Password Credentials</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Default Password:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono font-bold text-foreground">
              {DEFAULT_FEST_PASSWORD}
            </code>
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2.5 w-full text-xs"
            onClick={() => {
              setPassword(DEFAULT_FEST_PASSWORD);
              performUnlock(DEFAULT_FEST_PASSWORD);
            }}
          >
            <Sparkles className="size-3.5 text-primary" />
            One-Click Unlock ({DEFAULT_FEST_PASSWORD})
          </Button>
        </div>

        <div className="mt-4">
          <Button asChild variant="link" className="text-sm text-muted-foreground">
            <Link to="/">
              <ArrowLeft className="mr-1 size-4" />
              Back to Scoreboard
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
