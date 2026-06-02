import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-press relative inline-flex items-center justify-center whitespace-nowrap rounded-full font-display font-semibold tracking-[0.02em] transition-[transform,box-shadow,background-color,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-b focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  {
    variants: {
      variant: {
        primary:
          "btn-grad text-white shadow-[0_4px_14px_rgba(74,98,245,0.30),inset_0_1px_0_rgba(255,255,255,0.18)] hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(91,114,255,0.42),inset_0_1px_0_rgba(255,255,255,0.22)] active:translate-y-0",
        ghost:
          "bg-white/[0.02] text-white border border-white/[0.12] hover:border-accent-b/60 hover:bg-[rgba(74,98,245,0.10)] hover:-translate-y-0.5",
        hero: "btn-grad text-white shadow-[0_6px_20px_rgba(74,98,245,0.35),inset_0_1px_0_rgba(255,255,255,0.20)] hover:-translate-y-0.5 hover:shadow-[0_14px_44px_rgba(91,114,255,0.50),inset_0_1px_0_rgba(255,255,255,0.24)] active:translate-y-0",
      },
      size: {
        sm: "text-[13px] px-5 py-2",
        md: "text-[13px] px-[22px] py-[9px]",
        lg: "text-[15px] px-9 py-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
