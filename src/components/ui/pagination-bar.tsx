import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationBarProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function PaginationBar({ page, totalPages, onChange }: PaginationBarProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onChange(Math.max(1, page - 1))}
        className="gap-1"
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>
      <span className="text-sm font-medium text-muted-foreground px-2">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        className="gap-1"
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
