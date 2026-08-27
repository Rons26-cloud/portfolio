import { cn } from "@/lib/utils";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10", className)}>{children}</div>;
}
