'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Zap, 
  Image as ImageIcon, 
  FileText, 
  Code, 
  Palette, 
  Music, 
  Video,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: '首页',
    icon: Home,
    href: '/',
  },
  {
    id: 'ai-tools',
    label: 'AI 工具',
    icon: Zap,
    children: [
      {
        id: 'text-generation',
        label: '文本生成',
        icon: FileText,
        href: '/tools/text-generation',
      },
      {
        id: 'image-generation',
        label: '图像生成',
        icon: ImageIcon,
        href: '/tools/image-generation',
      },
      {
        id: 'code-generation',
        label: '代码生成',
        icon: Code,
        href: '/tools/code-generation',
      },
      {
        id: 'design-tools',
        label: '设计工具',
        icon: Palette,
        href: '/tools/design',
      },
      {
        id: 'audio-tools',
        label: '音频工具',
        icon: Music,
        href: '/tools/audio',
      },
      {
        id: 'video-tools',
        label: '视频工具',
        icon: Video,
        href: '/tools/video',
      },
    ],
  },
  {
    id: 'settings',
    label: '设置',
    icon: Settings,
    href: '/settings',
  },
  {
    id: 'help',
    label: '帮助',
    icon: HelpCircle,
    href: '/help',
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['ai-tools']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isItemActive = isActive(item.href);

    return (
      <div key={item.id}>
        <button
          type="button"
          className={`
            flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer w-full text-left
            ${level > 0 ? 'ml-4' : ''}
            ${isItemActive 
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
              : 'hover:bg-gray-50 text-gray-700'
            }
          `}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
          }}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          <div className="flex items-center space-x-3">
            <item.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
          
          {hasChildren && (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </button>

        {/* 子菜单 */}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => (
              <Link
                key={child.id}
                href={child.href || '#'}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                  ${isActive(child.href) 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'hover:bg-gray-50 text-gray-600'
                  }
                `}
              >
                <child.icon className="h-4 w-4" />
                <span className="text-sm">{child.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`
      fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto z-50
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </div>
    </aside>
  );
}
