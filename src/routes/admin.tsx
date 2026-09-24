import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  Download,
  Eye,
  EyeOff,
  FileSpreadsheet,
  KeyRound,
  Lock,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Trophy,
  Upload,
  X,
} from "lucide-react";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationBar } from "@/components/ui/pagination-bar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFestivalData } from "@/hooks/use-festival-data";
import { exportToExcel } from "@/lib/export-excel";
import {
  ALL_CATEGORIES,
  CATEGORIES,
  GRADES,
  initialTeams,
  POSITIONS,
  STAGE_TYPES,
  type AdminResultRecord,
  type CompetitorRecord,
  type GeneralResultRecord,
  type ProgramRecord,
  type ProgramStatus,
  type Team,
} from "@/lib/festival-data";
import {
  FestivalCalligraphyLogo,
  GuideonInstitutionLogo,
} from "@/components/festival-header-branding";
import {
  checkAdminPassword,
  DEFAULT_FEST_PASSWORD,
  getAdminPassword,
  isAdminUnlocked,
  setAdminUnlocked,
  setCustomAdminPassword,
} from "@/lib/gate.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Noorun Ala Noor · Meelad Fest 2026" },
      {
        name: "description",
        content: "Admin panel for Noorun Ala Noor Meelad Fest 2026 | Guideon Learning Hub.",
      },
      { property: "og:title", content: "Admin Panel — Noorun Ala Noor" },
      { property: "og:description", content: "Festival results and competition management." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [unlocked, setUnlocked] = useState(() => isAdminUnlocked());

  useEffect(() => {
    if (isAdminUnlocked()) {
      setUnlocked(true);
      return;
    }

    // Support instant URL param unlock (e.g., ?key=MNMF2K26 or ?pass=MNMF2K26)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlKey = params.get("key") || params.get("password") || params.get("pass");
      if (urlKey && checkAdminPassword(urlKey)) {
        setAdminUnlocked(true);
        setUnlocked(true);
        toast.success("Admin access granted via security key");
      }
    }
  }, []);

  const handleUnlockSuccess = useCallback(() => {
    setUnlocked(true);
  }, []);

  const handleLockSuccess = useCallback(() => {
    setAdminUnlocked(false);
    setUnlocked(false);
    toast.info("Admin panel locked");
  }, []);

  if (!unlocked) {
    return <AdminLoginScreen onUnlocked={handleUnlockSuccess} />;
  }

  return <AdminDashboard onLock={handleLockSuccess} />;
}

/* =========================================================================
   LOGIN SCREEN (Lightweight & Isolated)
   ========================================================================= */
const AdminLoginScreen = memo(function AdminLoginScreen({
  onUnlocked,
}: {
  onUnlocked: () => void;
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (checkAdminPassword(password)) {
      setAdminUnlocked(true);
      onUnlocked();
      toast.success("Admin access granted");
    } else {
      toast.error("Incorrect password. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 bg-background">
      <div className="glass-card w-full max-w-sm p-7 text-center border border-border shadow-xl">
        <div className="mx-auto mb-3 flex justify-center">
          <FestivalCalligraphyLogo className="size-20" />
        </div>
        <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
          <Lock className="size-4 text-primary" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
        <p className="mt-1 text-sm font-medium text-amber-500">
          Noorun Ala Noor · Meelad Fest 2026
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">Guideon Learning Hub</p>
        <p className="mt-3 text-xs text-muted-foreground/80">
          Enter the password to access administrative features
        </p>

        <form onSubmit={handleUnlock} className="mt-4 space-y-3">
          <div className="relative">
            <Input
              id="admin-password-input"
              name="admin_password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="pr-10 text-center font-mono tracking-wider"
              placeholder="Enter password (MNMF2K26)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          <Button type="submit" className="w-full font-medium">
            <KeyRound className="size-4 mr-1.5" /> Unlock Panel
          </Button>
        </form>

        {/* Quick 1-click Unlock Helper */}
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-left">
          <div className="flex items-center justify-between text-xs font-semibold text-primary">
            <span>Festival Passcode</span>
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground font-bold">
              {DEFAULT_FEST_PASSWORD}
            </code>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2.5 w-full text-xs font-semibold gap-1.5 border-primary/30 hover:bg-primary/10"
            onClick={() => {
              setPassword(DEFAULT_FEST_PASSWORD);
              if (checkAdminPassword(DEFAULT_FEST_PASSWORD)) {
                setAdminUnlocked(true);
                onUnlocked();
                toast.success("Admin access granted");
              }
            }}
          >
            <Sparkles className="size-3.5 text-primary" />
            Quick Unlock with Default Key
          </Button>
        </div>

        <Link
          to="/"
          className="mt-4 inline-block text-sm text-muted-foreground hover:underline transition-colors"
        >
          ← Back to scoreboard
        </Link>
      </div>
    </main>
  );
});

/* =========================================================================
   MAIN ADMIN DASHBOARD
   ========================================================================= */
const AdminDashboard = memo(function AdminDashboard({ onLock }: { onLock: () => void }) {
  const [activeTab, setActiveTab] = useState<string>("teams");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password management modal states
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const festivalData = useFestivalData();

  const handleSavePassword = useCallback(() => {
    const trimmed = newPassword.trim();
    if (!trimmed) {
      toast.error("Password cannot be empty");
      return;
    }
    if (trimmed !== confirmPassword.trim()) {
      toast.error("Passwords do not match");
      return;
    }
    setCustomAdminPassword(trimmed);
    setPasswordModalOpen(false);
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Admin password updated successfully");
  }, [newPassword, confirmPassword]);

  const handleResetPassword = useCallback(() => {
    setCustomAdminPassword(DEFAULT_FEST_PASSWORD);
    setPasswordModalOpen(false);
    setNewPassword("");
    setConfirmPassword("");
    toast.success(`Password reset to default (${DEFAULT_FEST_PASSWORD})`);
  }, []);

  const handleFileRestore = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content && festivalData.importAllData(content)) {
          toast.success("Festival data imported successfully!");
        } else {
          toast.error("Failed to import: invalid JSON format");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    [festivalData],
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Header */}
      <header className="glass-card mb-6 flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-3.5">
          <FestivalCalligraphyLogo className="size-14 sm:size-16" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 sm:text-sm">
              Noorun Ala Noor · Meelad Fest 2026
            </p>
            <p className="text-[11px] text-muted-foreground sm:text-xs">Guideon Learning Hub</p>
          </div>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="hidden sm:block mr-1">
            <GuideonInstitutionLogo className="size-12 sm:size-14" />
          </div>
          {/* Backup & Data Tools */}
          <Button
            variant="outline"
            size="sm"
            onClick={festivalData.exportAllData}
            title="Download JSON backup of all festival data"
            className="gap-1.5 cursor-pointer"
          >
            <Download className="size-4 text-muted-foreground" />
            <span className="hidden sm:inline">Backup</span>
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileRestore}
          />
          <Button
            variant="outline"
            size="sm"
            type="button"
            className="gap-1.5 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="size-4 text-muted-foreground" />
            <span className="hidden sm:inline">Restore</span>
          </Button>

          {/* Reset All Festival Data Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-destructive hover:bg-destructive/10 cursor-pointer"
                title="Reset all festival data back to original defaults"
              >
                <RotateCcw className="size-4" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset all festival data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all teams, competitors, programs, competition results, and
                  statuses back to default. Any unsaved custom entries will be replaced.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    festivalData.resetAllData();
                    toast.success("Festival data reset to defaults");
                  }}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Reset Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Password Management Dialog */}
          <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer">
                <KeyRound className="size-4 text-muted-foreground" />
                <span>Password</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" /> Admin Password Settings
                </DialogTitle>
                <DialogDescription>
                  Update the password required to access the admin panel.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground border border-border">
                  <p>
                    <span className="font-semibold text-foreground">Current Password:</span>{" "}
                    <code className="rounded bg-background px-1.5 py-0.5 font-mono font-bold text-primary">
                      {getAdminPassword()}
                    </code>
                  </p>
                  <p className="mt-1 text-[11px]">
                    Default system fallback password is{" "}
                    <span className="font-mono font-bold">{DEFAULT_FEST_PASSWORD}</span>.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Confirm Password
                  </label>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleResetPassword}
                  className="text-xs text-muted-foreground"
                >
                  Reset to Default
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPasswordModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleSavePassword}>
                    Save Changes
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <Trophy className="size-4 mr-1.5" />
              Scoreboard
            </Link>
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={onLock}
            title="Lock panel and exit"
            className="gap-1.5 cursor-pointer"
          >
            <LogOut className="size-4" />
            Lock
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-5 flex h-auto w-full flex-wrap justify-start gap-1 bg-background/60 p-1 border border-border">
          <TabsTrigger value="teams" className="cursor-pointer">
            Teams
          </TabsTrigger>
          <TabsTrigger value="competitors" className="cursor-pointer">
            Competitors
          </TabsTrigger>
          <TabsTrigger value="programs" className="cursor-pointer">
            Programs
          </TabsTrigger>
          <TabsTrigger value="results" className="cursor-pointer">
            Result
          </TabsTrigger>
          <TabsTrigger value="general" className="cursor-pointer">
            General Result
          </TabsTrigger>
          <TabsTrigger value="status" className="cursor-pointer">
            Program Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teams">
          <TeamsTab teams={festivalData.teams} onSaveTeams={festivalData.saveTeams} />
        </TabsContent>

        <TabsContent value="competitors">
          <CompetitorsTab
            competitors={festivalData.competitors}
            teams={festivalData.teams}
            onSaveCompetitors={festivalData.saveCompetitors}
          />
        </TabsContent>

        <TabsContent value="programs">
          <ProgramsTab
            programs={festivalData.programs}
            onSavePrograms={festivalData.savePrograms}
          />
        </TabsContent>

        <TabsContent value="results">
          <ResultsTab
            results={festivalData.adminResults}
            competitors={festivalData.competitors}
            programs={festivalData.programs}
            teams={festivalData.teams}
            onSaveResults={festivalData.saveAdminResults}
          />
        </TabsContent>

        <TabsContent value="general">
          <GeneralResultsTab
            generalResults={festivalData.generalResults}
            programs={festivalData.programs}
            teams={festivalData.teams}
            onSaveGeneralResults={festivalData.saveGeneralResults}
          />
        </TabsContent>

        <TabsContent value="status">
          <StatusTab
            statuses={festivalData.statuses}
            programs={festivalData.programs}
            onSaveStatuses={festivalData.saveStatuses}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
});

/* =========================================================================
   1. TEAMS TAB
   ========================================================================= */
const TeamsTab = memo(function TeamsTab({
  teams,
  onSaveTeams,
}: {
  teams: Team[];
  onSaveTeams: (next: Team[]) => void;
}) {
  const [teamName, setTeamName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleAddOrEditTeam = () => {
    if (editingId) {
      if (!editingName.trim()) {
        toast.error("Enter a valid team name");
        return;
      }
      const updated = teams.map((t) =>
        t.id === editingId ? { ...t, name: editingName.trim() } : t,
      );
      onSaveTeams(updated);
      setEditingId(null);
      setEditingName("");
      toast.success("Team name updated");
    } else {
      if (!teamName.trim()) {
        toast.error("Enter a team name");
        return;
      }
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        name: teamName.trim(),
      };
      onSaveTeams([...teams, newTeam]);
      setTeamName("");
      toast.success("Team added");
    }
  };

  const handleStartEdit = (t: Team) => {
    setEditingId(t.id);
    setEditingName(t.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDeleteTeam = (id: string) => {
    onSaveTeams(teams.filter((t) => t.id !== id));
    toast.success("Team deleted");
  };

  const handleRestoreDefaultTeams = () => {
    onSaveTeams(initialTeams);
    toast.success("Default festival teams restored");
  };

  return (
    <div className="space-y-6">
      {/* Add / Edit Team Form */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold">{editingId ? "Edit Team Name" : "Add Team"}</h3>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder={editingId ? "Update team name" : "Team name (e.g., TEAM SURAYYA)"}
            value={editingId ? editingName : teamName}
            onChange={(e) =>
              editingId ? setEditingName(e.target.value) : setTeamName(e.target.value)
            }
            onKeyDown={(e) => e.key === "Enter" && handleAddOrEditTeam()}
          />
          <div className="flex gap-2">
            <Button onClick={handleAddOrEditTeam}>
              {editingId ? (
                <>
                  <Check className="size-4 mr-1.5" /> Save Name
                </>
              ) : (
                <>
                  <Plus className="size-4 mr-1.5" /> Add Team
                </>
              )}
            </Button>
            {editingId && (
              <Button variant="outline" onClick={handleCancelEdit}>
                <X className="size-4 mr-1.5" /> Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Teams List */}
      <div className="glass-card p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">Teams ({teams.length})</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestoreDefaultTeams}
            className="text-xs gap-1.5"
            title="Reset teams list back to default 3 teams"
          >
            <RotateCcw className="size-3.5" />
            Restore Default Teams
          </Button>
        </div>

        {teams.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">No teams registered.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestoreDefaultTeams}
              className="mt-3 text-xs"
            >
              Restore Default Teams
            </Button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-3 shadow-sm hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-primary" />
                  <span className="font-semibold text-foreground">{team.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    onClick={() => handleStartEdit(team)}
                    title="Rename team"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    onClick={() => handleDeleteTeam(team.id)}
                    title="Delete team"
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

/* =========================================================================
   2. COMPETITORS TAB
   ========================================================================= */
const CompetitorsTab = memo(function CompetitorsTab({
  competitors,
  teams,
  onSaveCompetitors,
}: {
  competitors: CompetitorRecord[];
  teams: Team[];
  onSaveCompetitors: (next: CompetitorRecord[]) => void;
}) {
  const [name, setName] = useState("");
  const [chestNo, setChestNo] = useState("");
  const [category, setCategory] = useState("");
  const [teamId, setTeamId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(competitors.length / 20));
  const paginatedCompetitors = useMemo(
    () => competitors.slice((page - 1) * 20, page * 20),
    [competitors, page],
  );

  const resetForm = () => {
    setName("");
    setChestNo("");
    setCategory("");
    setTeamId("");
    setEditingId(null);
  };

  const handleSave = () => {
    if (!name.trim() || !chestNo.trim() || !category || !teamId) {
      toast.error("Fill all fields");
      return;
    }

    if (editingId) {
      const updated = competitors.map((c) =>
        c.id === editingId
          ? {
              ...c,
              name: name.trim(),
              chest_no: chestNo.trim(),
              category,
              team_id: teamId,
            }
          : c,
      );
      onSaveCompetitors(updated);
      toast.success("Competitor updated");
    } else {
      const newCompetitor: CompetitorRecord = {
        id: `c-${Date.now()}`,
        name: name.trim(),
        chest_no: chestNo.trim(),
        category,
        team_id: teamId,
      };
      onSaveCompetitors([...competitors, newCompetitor]);
      toast.success("Competitor added");
    }
    resetForm();
  };

  const handleEdit = (comp: CompetitorRecord) => {
    setEditingId(comp.id);
    setName(comp.name);
    setChestNo(comp.chest_no);
    setCategory(comp.category);
    setTeamId(comp.team_id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    onSaveCompetitors(competitors.filter((c) => c.id !== id));
    toast.success("Competitor deleted");
  };

  const handleClearAll = () => {
    onSaveCompetitors([]);
    resetForm();
    toast.success("All competitors deleted");
  };

  const getTeamName = (tId: string) => teams.find((t) => t.id === tId)?.name ?? "—";

  return (
    <div className="space-y-6">
      {/* Add / Edit Form */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold">
          {editingId ? "Edit Competitor" : "Add Competitor"}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="Competitor name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Chest number"
            value={chestNo}
            onChange={(e) => setChestNo(e.target.value)}
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={teamId} onValueChange={setTeamId}>
            <SelectTrigger>
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button onClick={handleSave}>
            <Plus className="size-4 mr-1.5" />
            {editingId ? "Save Changes" : "Add Competitor"}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={resetForm}>
              <X className="size-4 mr-1.5" /> Cancel
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" type="button" className="ml-auto">
                <Trash2 className="size-4 mr-1.5" /> Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all competitors?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All competitor entries will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearAll}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Competitors List */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold">Competitors ({competitors.length})</h3>
        {competitors.length === 0 ? (
          <p className="text-sm text-muted-foreground">No competitors yet.</p>
        ) : (
          <div className="space-y-2">
            {paginatedCompetitors.map((comp) => (
              <div
                key={comp.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3"
              >
                <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  #{comp.chest_no}
                </span>
                <span className="font-medium">{comp.name}</span>
                <span className="text-sm text-muted-foreground">{comp.category}</span>
                <span className="text-sm text-muted-foreground">{getTeamName(comp.team_id)}</span>
                <div className="ml-auto flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(comp)}
                    title="Edit competitor"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(comp.id)}
                    title="Delete competitor"
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <PaginationBar page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
});

/* =========================================================================
   3. PROGRAMS TAB
   ========================================================================= */
const ProgramsTab = memo(function ProgramsTab({
  programs,
  onSavePrograms,
}: {
  programs: ProgramRecord[];
  onSavePrograms: (next: ProgramRecord[]) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stageType, setStageType] = useState<"On-Stage" | "Off-Stage" | "">("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(programs.length / 20));
  const paginatedPrograms = useMemo(
    () => programs.slice((page - 1) * 20, page * 20),
    [programs, page],
  );

  const resetForm = () => {
    setName("");
    setCategory("");
    setStageType("");
    setEditingId(null);
  };

  const handleSave = () => {
    if (!name.trim() || !category || !stageType) {
      toast.error("Fill all fields");
      return;
    }

    if (editingId) {
      const updated = programs.map((p) =>
        p.id === editingId
          ? {
              ...p,
              name: name.trim(),
              category,
              stage_type: stageType as "On-Stage" | "Off-Stage",
            }
          : p,
      );
      onSavePrograms(updated);
      toast.success("Program updated");
    } else {
      const newProgram: ProgramRecord = {
        id: `p-${Date.now()}`,
        name: name.trim(),
        category,
        stage_type: stageType as "On-Stage" | "Off-Stage",
      };
      onSavePrograms([...programs, newProgram]);
      toast.success("Program added");
    }
    resetForm();
  };

  const handleEdit = (prog: ProgramRecord) => {
    setEditingId(prog.id);
    setName(prog.name);
    setCategory(prog.category);
    setStageType(prog.stage_type);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    onSavePrograms(programs.filter((p) => p.id !== id));
    toast.success("Program deleted");
  };

  const handleClearAll = () => {
    onSavePrograms([]);
    resetForm();
    toast.success("All programs deleted");
  };

  return (
    <div className="space-y-6">
      {/* Add / Edit Form */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold">{editingId ? "Edit Program" : "Add Program"}</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <Input
            placeholder="Program name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Program category" />
            </SelectTrigger>
            <SelectContent>
              {ALL_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={stageType}
            onValueChange={(val) => setStageType(val as "On-Stage" | "Off-Stage")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Stage type" />
            </SelectTrigger>
            <SelectContent>
              {STAGE_TYPES.map((st) => (
                <SelectItem key={st} value={st}>
                  {st}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button onClick={handleSave}>
            <Plus className="size-4 mr-1.5" />
            {editingId ? "Save Changes" : "Add Program"}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={resetForm}>
              <X className="size-4 mr-1.5" /> Cancel
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" type="button" className="ml-auto">
                <Trash2 className="size-4 mr-1.5" /> Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all programs?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All program entries will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearAll}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Programs List */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold">Programs ({programs.length})</h3>
        {programs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No programs yet.</p>
        ) : (
          <div className="space-y-2">
            {paginatedPrograms.map((prog) => (
              <div
                key={prog.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3"
              >
                <span className="font-medium">{prog.name}</span>
                <span className="text-sm text-muted-foreground">{prog.category}</span>
                <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                  {prog.stage_type}
                </span>
                <div className="ml-auto flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(prog)}
                    title="Edit program"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(prog.id)}
                    title="Delete program"
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <PaginationBar page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
});

/* =========================================================================
   4. RESULTS TAB (Competition Results)
   ========================================================================= */
const ResultsTab = memo(function ResultsTab({
  results,
  competitors,
  programs,
  teams,
  onSaveResults,
}: {
  results: AdminResultRecord[];
  competitors: CompetitorRecord[];
  programs: ProgramRecord[];
  teams: Team[];
  onSaveResults: (next: AdminResultRecord[]) => void;
}) {
  const [chestNo, setChestNo] = useState("");
  const [competitorSearch, setCompetitorSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [stageType, setStageType] = useState<"On-Stage" | "Off-Stage" | "">("");
  const [programId, setProgramId] = useState("");
  const [position, setPosition] = useState<"1st" | "2nd" | "3rd" | "NIL">("NIL");
  const [grade, setGrade] = useState<"A" | "B" | "C" | "NIL">("NIL");
  const [score, setScore] = useState("");
  const [page, setPage] = useState(1);

  // Close suggestions dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter matching competitors based on search query
  const matchingCompetitors = useMemo(() => {
    const q = competitorSearch.trim().toLowerCase();
    if (!q) return competitors.slice(0, 10);
    return competitors
      .filter((c) => c.name.toLowerCase().includes(q) || c.chest_no.toLowerCase().includes(q))
      .slice(0, 12);
  }, [competitors, competitorSearch]);

  // Auto-find competitor by chest number
  const matchedCompetitor = useMemo(
    () => competitors.find((c) => c.chest_no.trim().toLowerCase() === chestNo.trim().toLowerCase()),
    [competitors, chestNo],
  );

  const matchedTeam = useMemo(
    () => teams.find((t) => t.id === matchedCompetitor?.team_id),
    [teams, matchedCompetitor],
  );

  // Select competitor from name search dropdown: automatically sets chest number
  const handleSelectCompetitor = (c: CompetitorRecord) => {
    setChestNo(c.chest_no);
    setCompetitorSearch(c.name);
    setIsSearchOpen(false);
    setProgramId("");
  };

  // When chest number is typed manually, sync competitor name search field
  const handleChestNoChange = (val: string) => {
    setChestNo(val);
    setProgramId("");
    const matched = competitors.find(
      (c) => c.chest_no.trim().toLowerCase() === val.trim().toLowerCase(),
    );
    if (matched) {
      setCompetitorSearch(matched.name);
    }
  };

  const handleClearCompetitor = () => {
    setChestNo("");
    setCompetitorSearch("");
    setProgramId("");
    setIsSearchOpen(false);
  };

  // Filter programs matching competitor's category and stageType
  const eligiblePrograms = useMemo(
    () =>
      programs.filter(
        (p) =>
          (!stageType || p.stage_type === stageType) && p.category === matchedCompetitor?.category,
      ),
    [programs, stageType, matchedCompetitor?.category],
  );

  const totalPages = Math.max(1, Math.ceil(results.length / 20));
  const paginatedResults = useMemo(
    () => results.slice((page - 1) * 20, page * 20),
    [results, page],
  );

  const handleAddResult = () => {
    const prog = programs.find((p) => p.id === programId);
    if (!matchedCompetitor) {
      toast.error("Please select a competitor or enter a valid chest number");
      return;
    }
    if (!prog) {
      toast.error("Select a program");
      return;
    }

    const newResult: AdminResultRecord = {
      id: `r-${Date.now()}`,
      competitor_id: matchedCompetitor.id,
      program_id: prog.id,
      chest_no: matchedCompetitor.chest_no,
      competitor_name: matchedCompetitor.name,
      category: matchedCompetitor.category,
      team_id: matchedCompetitor.team_id,
      team_name: matchedTeam?.name ?? null,
      program_name: prog.name,
      stage_type: prog.stage_type,
      position,
      grade,
      score: Number(score) || 0,
    };

    onSaveResults([newResult, ...results]);
    setChestNo("");
    setCompetitorSearch("");
    setProgramId("");
    setPosition("NIL");
    setGrade("NIL");
    setScore("");
    setPage(1);
    toast.success("Result added");
  };

  const handleDelete = (id: string) => {
    onSaveResults(results.filter((r) => r.id !== id));
    toast.success("Result deleted");
  };

  const handleExport = () => {
    if (results.length === 0) {
      toast.error("No results to export");
      return;
    }
    exportToExcel(
      results.map((r) => ({
        "Chest No": r.chest_no,
        Competitor: r.competitor_name,
        Category: r.category,
        Team: r.team_name ?? "",
        Program: r.program_name,
        "Stage Type": r.stage_type,
        Position: r.position,
        Grade: r.grade,
        Score: r.score,
      })),
      "Noorun-Ala-Noor-2026-Results",
      "Results",
    );
    toast.success("Results exported to Excel");
  };

  const handleClearAll = () => {
    onSaveResults([]);
    toast.success("All results deleted");
  };

  return (
    <div className="space-y-6">
      {/* Add Result Form */}
      <div className="glass-card p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">Add Result</h3>
          {matchedCompetitor && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ Competitor linked: {matchedCompetitor.name} (#{matchedCompetitor.chest_no})
            </span>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Competitor Name Search (Auto-fills Chest Number) */}
          <div ref={searchContainerRef} className="relative">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Search Competitor Name
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search competitor by name..."
                className="pl-9 pr-8"
                value={competitorSearch}
                onChange={(e) => {
                  setCompetitorSearch(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
              />
              {competitorSearch && (
                <button
                  type="button"
                  onClick={handleClearCompetitor}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Live Suggestions Dropdown */}
            {isSearchOpen && (
              <div className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-xl text-popover-foreground">
                {matchingCompetitors.length > 0 ? (
                  matchingCompetitors.map((c) => {
                    const tm = teams.find((t) => t.id === c.team_id);
                    const isSelected = c.chest_no === chestNo;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleSelectCompetitor(c)}
                        className={`flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-xs transition-colors ${
                          isSelected
                            ? "bg-primary/15 font-semibold text-primary"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className="font-semibold text-foreground">{c.name}</span>
                          <span className="ml-1.5 text-[11px] text-muted-foreground">
                            ({c.category})
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono font-bold text-primary">
                            #{c.chest_no}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {tm?.name ?? ""}
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-3 text-center text-xs text-muted-foreground">
                    No competitor found matching "{competitorSearch}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chest Number (Auto-fills on selection or updates name on manual entry) */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Chest Number
            </label>
            <div className="relative">
              <Input
                placeholder="Chest no (auto-fills)"
                value={chestNo}
                onChange={(e) => handleChestNoChange(e.target.value)}
              />
              {matchedCompetitor && (
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Auto-filled
                </span>
              )}
            </div>
            <p className="mt-1 min-h-5 text-xs text-muted-foreground truncate">
              {matchedCompetitor
                ? `${matchedCompetitor.name} · ${matchedCompetitor.category} · ${matchedTeam?.name ?? "No team"}`
                : chestNo
                  ? "No competitor found for this chest number"
                  : "Search name or enter chest number"}
            </p>
          </div>

          {/* Stage Type */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Stage Type
            </label>
            <Select
              value={stageType}
              onValueChange={(val) => {
                setStageType(val as "On-Stage" | "Off-Stage");
                setProgramId("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Stage type" />
              </SelectTrigger>
              <SelectContent>
                {STAGE_TYPES.map((st) => (
                  <SelectItem key={st} value={st}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Program */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Program</label>
            <Select value={programId} onValueChange={setProgramId}>
              <SelectTrigger>
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                {eligiblePrograms.map((prog) => (
                  <SelectItem key={prog.id} value={prog.id}>
                    {prog.name}
                  </SelectItem>
                ))}
                {eligiblePrograms.length === 0 && (
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    {matchedCompetitor
                      ? "No programs for this category & stage"
                      : "Select competitor & stage type"}
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Position with Quick Select Buttons */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-medium text-muted-foreground">Position</label>
              <div className="flex gap-1">
                {(["1st", "2nd", "3rd", "NIL"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPosition(p);
                      if (!score) {
                        if (p === "1st") setScore("7");
                        else if (p === "2nd") setScore("5");
                        else if (p === "3rd") setScore("3");
                      }
                    }}
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors ${
                      position === p
                        ? p === "1st"
                          ? "bg-amber-500 text-black"
                          : p === "2nd"
                            ? "bg-slate-400 text-black"
                            : p === "3rd"
                              ? "bg-amber-700 text-white"
                              : "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <Select
              value={position}
              onValueChange={(val) => {
                const p = val as "1st" | "2nd" | "3rd" | "NIL";
                setPosition(p);
                if (!score) {
                  if (p === "1st") setScore("7");
                  else if (p === "2nd") setScore("5");
                  else if (p === "3rd") setScore("3");
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                {POSITIONS.map((pos) => (
                  <SelectItem key={pos} value={pos}>
                    {pos}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grade */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Grade</label>
            <Select value={grade} onValueChange={(val) => setGrade(val as "A" | "B" | "C" | "NIL")}>
              <SelectTrigger>
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                {GRADES.map((gr) => (
                  <SelectItem key={gr} value={gr}>
                    {gr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Score */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Score Points
            </label>
            <Input
              type="number"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button onClick={handleAddResult}>
            <Plus className="size-4 mr-1.5" /> Add Result
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <FileSpreadsheet className="size-4 mr-1.5" /> Export Excel
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" type="button" className="ml-auto">
                <Trash2 className="size-4 mr-1.5" /> Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all results?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All competition result records will be permanently
                  removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearAll}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Results List */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold">Results ({results.length})</h3>
        {results.length === 0 ? (
          <p className="text-sm text-muted-foreground">No results yet.</p>
        ) : (
          <div className="space-y-2">
            {paginatedResults.map((res) => (
              <div
                key={res.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3"
              >
                <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  #{res.chest_no}
                </span>
                <span className="font-medium">{res.competitor_name}</span>
                <span className="text-sm text-muted-foreground">{res.program_name}</span>
                <span className="text-sm text-muted-foreground">
                  {res.category} · {res.stage_type}
                </span>
                <span className="text-sm text-muted-foreground">{res.team_name ?? "No team"}</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold ${
                    res.position === "1st"
                      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                      : res.position === "2nd"
                        ? "bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/30"
                        : res.position === "3rd"
                          ? "bg-amber-800/15 text-amber-800 dark:text-amber-300 border border-amber-700/40"
                          : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {res.position} {res.grade !== "NIL" && `· Gr ${res.grade}`}
                </span>
                <span className="font-bold text-primary text-sm">{res.score} pts</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(res.id)}
                  className="ml-auto"
                  title="Delete result"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <PaginationBar page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
});

/* =========================================================================
   5. GENERAL RESULTS TAB
   ========================================================================= */
const GeneralResultsTab = memo(function GeneralResultsTab({
  generalResults,
  programs,
  teams,
  onSaveGeneralResults,
}: {
  generalResults: GeneralResultRecord[];
  programs: ProgramRecord[];
  teams: Team[];
  onSaveGeneralResults: (next: GeneralResultRecord[]) => void;
}) {
  const [stageType, setStageType] = useState<"On-Stage" | "Off-Stage" | "">("");
  const [programId, setProgramId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [position, setPosition] = useState<"1st" | "2nd" | "3rd" | "NIL">("NIL");
  const [grade, setGrade] = useState<"A" | "B" | "C" | "NIL">("NIL");
  const [score, setScore] = useState("");
  const [page, setPage] = useState(1);

  const generalPrograms = useMemo(
    () =>
      programs.filter(
        (p) => p.category === "General" && (!stageType || p.stage_type === stageType),
      ),
    [programs, stageType],
  );

  const totalPages = Math.max(1, Math.ceil(generalResults.length / 20));
  const paginatedGeneralResults = useMemo(
    () => generalResults.slice((page - 1) * 20, page * 20),
    [generalResults, page],
  );

  const handleAdd = () => {
    const prog = programs.find((p) => p.id === programId);
    const tm = teams.find((t) => t.id === teamId);
    if (!prog || !tm) {
      toast.error("Select program and team");
      return;
    }

    const newGeneral: GeneralResultRecord = {
      id: `gr-${Date.now()}`,
      program_id: prog.id,
      program_name: prog.name,
      stage_type: prog.stage_type,
      team_id: tm.id,
      team_name: tm.name,
      position,
      grade,
      score: Number(score) || 0,
    };

    onSaveGeneralResults([newGeneral, ...generalResults]);
    setProgramId("");
    setTeamId("");
    setPosition("NIL");
    setGrade("NIL");
    setScore("");
    setPage(1);
    toast.success("General result added");
  };

  const handleDelete = (id: string) => {
    onSaveGeneralResults(generalResults.filter((g) => g.id !== id));
    toast.success("General result deleted");
  };

  const handleExport = () => {
    if (generalResults.length === 0) {
      toast.error("No results to export");
      return;
    }
    exportToExcel(
      generalResults.map((g) => ({
        Program: g.program_name,
        "Stage Type": g.stage_type,
        Team: g.team_name ?? "",
        Position: g.position,
        Grade: g.grade,
        Score: g.score,
      })),
      "Noorun-Ala-Noor-2026-General-Results",
      "General Results",
    );
    toast.success("General results exported to Excel");
  };

  const handleClearAll = () => {
    onSaveGeneralResults([]);
    toast.success("All general results deleted");
  };

  return (
    <div className="space-y-6">
      {/* Add General Result */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold">Add General Result</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Select
            value={stageType}
            onValueChange={(val) => {
              setStageType(val as "On-Stage" | "Off-Stage");
              setProgramId("");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Stage type" />
            </SelectTrigger>
            <SelectContent>
              {STAGE_TYPES.map((st) => (
                <SelectItem key={st} value={st}>
                  {st}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={programId} onValueChange={setProgramId}>
            <SelectTrigger>
              <SelectValue placeholder="Program (General)" />
            </SelectTrigger>
            <SelectContent>
              {generalPrograms.map((prog) => (
                <SelectItem key={prog.id} value={prog.id}>
                  {prog.name}
                </SelectItem>
              ))}
              {generalPrograms.length === 0 && (
                <div className="px-3 py-2 text-xs text-muted-foreground">No general programs</div>
              )}
            </SelectContent>
          </Select>

          <Select value={teamId} onValueChange={setTeamId}>
            <SelectTrigger>
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((tm) => (
                <SelectItem key={tm.id} value={tm.id}>
                  {tm.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Position with Quick Select Buttons */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-medium text-muted-foreground">Position</label>
              <div className="flex gap-1">
                {(["1st", "2nd", "3rd", "NIL"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPosition(p);
                      if (!score) {
                        if (p === "1st") setScore("10");
                        else if (p === "2nd") setScore("8");
                        else if (p === "3rd") setScore("5");
                      }
                    }}
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors ${
                      position === p
                        ? p === "1st"
                          ? "bg-amber-500 text-black"
                          : p === "2nd"
                            ? "bg-slate-400 text-black"
                            : p === "3rd"
                              ? "bg-amber-700 text-white"
                              : "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <Select
              value={position}
              onValueChange={(val) => {
                const p = val as "1st" | "2nd" | "3rd" | "NIL";
                setPosition(p);
                if (!score) {
                  if (p === "1st") setScore("10");
                  else if (p === "2nd") setScore("8");
                  else if (p === "3rd") setScore("5");
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                {POSITIONS.map((pos) => (
                  <SelectItem key={pos} value={pos}>
                    {pos}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Select value={grade} onValueChange={(val) => setGrade(val as "A" | "B" | "C" | "NIL")}>
            <SelectTrigger>
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              {GRADES.map((gr) => (
                <SelectItem key={gr} value={gr}>
                  {gr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button onClick={handleAdd}>
            <Plus className="size-4 mr-1.5" /> Add Result
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <FileSpreadsheet className="size-4 mr-1.5" /> Export Excel
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" type="button" className="ml-auto">
                <Trash2 className="size-4 mr-1.5" /> Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all general results?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All general result records will be permanently
                  removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearAll}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* General Results List */}
      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold">General Results ({generalResults.length})</h3>
        {generalResults.length === 0 ? (
          <p className="text-sm text-muted-foreground">No general results yet.</p>
        ) : (
          <div className="space-y-2">
            {paginatedGeneralResults.map((res) => (
              <div
                key={res.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3"
              >
                <span className="font-medium">{res.program_name}</span>
                <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                  {res.stage_type}
                </span>
                <span className="text-sm text-muted-foreground">{res.team_name ?? "No team"}</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold ${
                    res.position === "1st"
                      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                      : res.position === "2nd"
                        ? "bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/30"
                        : res.position === "3rd"
                          ? "bg-amber-800/15 text-amber-800 dark:text-amber-300 border border-amber-700/40"
                          : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {res.position} {res.grade !== "NIL" && `· Gr ${res.grade}`}
                </span>
                <span className="font-bold text-primary text-sm">{res.score} pts</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(res.id)}
                  className="ml-auto"
                  title="Delete general result"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <PaginationBar page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
});

/* =========================================================================
   6. PROGRAM STATUS TAB (Live Festival Screens)
   ========================================================================= */
const StatusTab = memo(function StatusTab({
  statuses,
  programs,
  onSaveStatuses,
}: {
  statuses: ProgramStatus[];
  programs: ProgramRecord[];
  onSaveStatuses: (next: ProgramStatus[]) => void;
}) {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [selectedStage, setSelectedStage] = useState<"On-Stage" | "Off-Stage">("On-Stage");
  const [selectedStatus, setSelectedStatus] = useState<"Outed" | "Pending">("Outed");

  const handleAddStatus = () => {
    if (!selectedProgram.trim()) {
      toast.error("Enter a program name");
      return;
    }
    const newStatus: ProgramStatus = {
      id: `s-${Date.now()}`,
      program: selectedProgram.trim(),
      category: selectedCategory,
      stage: selectedStage,
      status: selectedStatus,
    };
    onSaveStatuses([newStatus, ...statuses]);
    setSelectedProgram("");
    toast.success("Program status added");
  };

  const toggleStatus = (id: string) => {
    onSaveStatuses(
      statuses.map((s) =>
        s.id === id ? { ...s, status: s.status === "Outed" ? "Pending" : "Outed" } : s,
      ),
    );
  };

  const handleDelete = (id: string) => {
    onSaveStatuses(statuses.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold">Add / Update Live Program Status</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="Program name"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            list="status-programs-list"
          />
          <datalist id="status-programs-list">
            {programs.map((p) => (
              <option key={p.id} value={p.name} />
            ))}
          </datalist>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {ALL_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedStage}
            onValueChange={(val) => setSelectedStage(val as "On-Stage" | "Off-Stage")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              {STAGE_TYPES.map((st) => (
                <SelectItem key={st} value={st}>
                  {st}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedStatus}
            onValueChange={(val) => setSelectedStatus(val as "Outed" | "Pending")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Outed">Outed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="mt-4" onClick={handleAddStatus}>
          <Plus className="size-4 mr-1.5" /> Set Program Status
        </Button>
      </div>

      <div className="glass-card p-5">
        <h3 className="mb-4 text-lg font-semibold">Live Status List ({statuses.length})</h3>
        <div className="space-y-2">
          {statuses.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3"
            >
              <span className="font-semibold">{item.program}</span>
              <span className="text-xs text-muted-foreground">
                {item.category} · {item.stage}
              </span>
              <button
                type="button"
                onClick={() => toggleStatus(item.id)}
                className={`ml-auto cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  item.status === "Outed"
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                }`}
              >
                {item.status === "Outed" ? (
                  <span className="flex items-center gap-1">
                    <Check className="size-3.5" /> Outed
                  </span>
                ) : (
                  "Pending"
                )}
              </button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(item.id)}
                title="Delete status"
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
