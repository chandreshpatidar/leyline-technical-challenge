import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ChatHeaderProps {
  children: React.ReactNode;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ children }) => {
  return (
    <div id="chatHeader" className='px-5 py-4 bg-transparent flex items-center gap-3'>
      <Link
        href='/'
        className='rounded-full p-2 hover:bg-gray-400/30'
      >
        <ArrowLeft size={20} />
      </Link>

      <div className='text-xl font-semibold'>{children}</div>
    </div>
  );
};

export default ChatHeader;
