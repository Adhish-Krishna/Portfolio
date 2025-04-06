import { cn } from "../../lib/utils";

interface BackgroundProps {
  className?: string;
}

export function Background({ className }: BackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 [background-size:40px_40px] select-none z-[-1]",
        "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        className
      )}
    />
  );
}