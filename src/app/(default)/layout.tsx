'use client';

import { type ReactNode, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <Navbar />
      
      <div className="flex">
        {/* 侧边栏 */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* 主内容区域 */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-6 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* 移动端遮罩层 */}
      {sidebarOpen && (
        <button 
          type="button"
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSidebarOpen(false);
            }
          }}
          aria-label="关闭侧边栏"
        />
      )}
    </div>
  );
}
