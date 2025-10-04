"use client";

import type { ReactNode } from "react";

interface AiToolLayoutProps {
  children: ReactNode;
}

export default function AiToolLayout({ children }: AiToolLayoutProps) {
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {children}
    </div>
  );
}
