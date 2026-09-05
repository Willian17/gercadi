import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full resize-y rounded-xl border border-black/15 bg-paper px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-muted/65 focus:border-tracking-green focus:ring-2 focus:ring-tracking-green/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
