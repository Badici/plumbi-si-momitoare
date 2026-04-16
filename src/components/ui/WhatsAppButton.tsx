"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

type Props = Omit<HTMLMotionProps<"a">, "href" | "children"> & {
  href: string;
  children?: ReactNode;
  size?: "md" | "lg";
};

export function WhatsAppButton({ href, className = "", size = "md", children, ...rest }: Props) {
  const reduce = useReducedMotion();
  const sizeCls = size === "lg" ? "min-h-[52px] px-7 text-base gap-2.5" : "min-h-[48px] px-5 text-sm gap-2";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full font-semibold text-white shadow-[0_12px_40px_-12px_rgba(91,146,145,0.55)] bg-[#5B9291] ring-1 ring-white/20 transition-colors hover:bg-[#4d7f7e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D3028] ${sizeCls} ${className}`}
      whileHover={reduce ? undefined : { y: -1, boxShadow: "0 16px 44px -12px rgba(91,146,145,0.6)" }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      {...rest}
    >
      <MessageCircle className="size-[1.15em] shrink-0" aria-hidden />
      {children}
    </motion.a>
  );
}
