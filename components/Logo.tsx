import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light" | "dark";
  showText?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  variant = "default",
  showText = true,
  className,
}: LogoProps) {
  const sizes = {
    sm: { icon: "w-8 h-8", tooth: "w-5 h-5", text: "text-lg" },
    md: { icon: "w-10 h-10", tooth: "w-6 h-6", text: "text-xl" },
    lg: { icon: "w-12 h-12", tooth: "w-8 h-8", text: "text-2xl" },
  };

  const variants = {
    default: {
      bg: "bg-primary",
      tooth: "text-white",
      textPrimary: "text-foreground",
      textAccent: "text-accent",
    },
    light: {
      bg: "bg-white/20",
      tooth: "text-white",
      textPrimary: "text-white",
      textAccent: "text-teal-300",
    },
    dark: {
      bg: "bg-primary",
      tooth: "text-white",
      textPrimary: "text-foreground",
      textAccent: "text-accent",
    },
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 group", className)}
    >
      {/* Tooth Icon Container */}
      <div
        className={cn(
          currentSize.icon,
          currentVariant.bg,
          "rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        )}
      >
        {/* Tooth SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn(currentSize.tooth, currentVariant.tooth)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 8 5 10C5 12 5.5 14 6 16C6.5 18 7 20 8 21.5C8.5 22.5 9.5 22 10 21C10.5 20 11 18 11 16C11 15 11.5 14 12 14C12.5 14 13 15 13 16C13 18 13.5 20 14 21C14.5 22 15.5 22.5 16 21.5C17 20 17.5 18 18 16C18.5 14 19 12 19 10C19 8 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Text Logo */}
      {showText && (
        <span className={cn(currentSize.text, "font-semibold tracking-tight")}>
          <span className={currentVariant.textPrimary}>Dentist</span>
          <span className={currentVariant.textAccent}>NearMe</span>
          <span className={currentVariant.textPrimary}>.com</span>
        </span>
      )}
    </Link>
  );
}
