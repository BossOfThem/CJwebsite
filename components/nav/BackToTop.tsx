"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`hidden md:inline-flex fixed bottom-6 right-6 z-40 size-12 items-center justify-center rounded-sm bg-[var(--ink)] text-[var(--bone)] border border-[var(--amber)] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] hover:bg-[var(--amber)] hover:text-[var(--ink)] transition-all duration-200 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="size-5" aria-hidden />
    </a>
  );
}
