import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-14 w-full rounded-xl border border-black/15 bg-paper px-4 text-base text-ink outline-none transition-colors placeholder:text-muted/65 focus:border-tracking-green focus:ring-2 focus:ring-tracking-green/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
