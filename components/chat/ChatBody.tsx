'use client';

import { calculateChatBoxBodyHeight } from '@/lib/utils';
import { useSettlementStore } from '@/store/settlement/store';
import React, { useEffect } from 'react';

interface ChatBodyProps {
  children: React.ReactNode;
}

const ChatBody: React.FC<ChatBodyProps> = ({ children }) => {
  const bodyHeight = useSettlementStore((state) => state.chatBoxBodyHeight);

  useEffect(() => {
    calculateChatBoxBodyHeight();
  }, []);

  return (
    <div
      style={{ minHeight: `${bodyHeight}px`, maxHeight: `${bodyHeight}px` }}
      className='px-12 py-4 bg-transparent  border-y border-gray-300  flex flex-col gap-2 h-full overflow-y-auto'
    >
      {children}
    </div>
  );
};

export default ChatBody;
