import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-extrabold tracking-[-0.02em] transition-[color,background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-red focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-action-red text-white hover:bg-[#a9151b]",
        tracking: "bg-tracking-green text-white hover:bg-forest",
        outline:
          "border border-black/15 bg-white text-ink hover:border-ink hover:bg-ivory",
        light: "bg-white text-carbon hover:bg-ivory",
        ghost: "text-ink hover:bg-ivory",
      },
      size: {
        default: "min-h-12 px-5",
        lg: "min-h-14 px-7 text-base",
        sm: "min-h-10 px-4 text-sm",
        icon: "size-12 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
