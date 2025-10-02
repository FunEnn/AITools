'use client';

import type { ReactNode } from 'react';

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
