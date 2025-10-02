'use client';

import { useUser, useClerk, Protect } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, SquarePen, Hash, Image as ImageIcon, Eraser, Scissors, FileText, Users, LogOut } from 'lucide-react';

interface SidebarProps {
  sidebar?: boolean;
  setSidebar?: (value: boolean) => void;
}

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: Home },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: ImageIcon },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
];

export default function Sidebar({ sidebar, setSidebar }: SidebarProps) {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const pathname = usePathname();

  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
      <div className='my-7 w-full'>
        {user?.imageUrl && (
          <Image 
            src={user.imageUrl} 
            alt="User avatar" 
            className='w-13 rounded-full mx-auto'
            width={52}
            height={52}
          />
        )}
        <h1 className='mt-1 text-center'>{user?.fullName}</h1>
        
        <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
          {navItems.map(({ to, label, Icon }) => {
            const isActive = pathname === to;
            return (
              <Link 
                key={to} 
                href={to} 
                onClick={() => setSidebar?.(false)}
                className={`px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
        <button 
          type="button"
          onClick={() => openUserProfile()} 
          className='flex items-center gap-2 cursor-pointer'
        >
          <Image 
            src={user?.imageUrl || ''} 
            alt="User avatar" 
            className='w-8 rounded-full'
            width={32}
            height={32}
          />
          <div>
            <h1 className='text-sm font-medium'>{user?.fullName}</h1>
            <p className='text-xs text-gray-500'>
              <Protect plan='premium' fallback="Free">Premium</Protect>{' '}
              Plan
            </p>
          </div>
        </button>
          <LogOut onClick={() => signOut()} className="w-4.5 text-gray-400
          hover:text-gray-700 transition cursor-pointer" />
      </div>
    </div>
  );
}
