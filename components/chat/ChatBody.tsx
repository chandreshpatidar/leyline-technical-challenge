'use client';

import React, { useEffect, useState } from 'react';

interface ChatBodyProps {
  children: React.ReactNode;
}

const ChatBody: React.FC<ChatBodyProps> = ({ children }) => {
  const [bodyHeight, setBodyHeight] = useState<number>(0);

  // Calculate the body height based on the header and footer
  const calculateBodyHeight = () => {
    const header = document.getElementById('chatHeader');
    const footer = document.getElementById('chatFooter');
    const body = document.getElementsByTagName('body')[0];

    if (header && footer && body) {
      const { height: headerHeight } = header.getBoundingClientRect();
      const { height: footerHeight } = footer.getBoundingClientRect();
      const { height: bodyHeight } = body.getBoundingClientRect();

      setBodyHeight(bodyHeight - (headerHeight + footerHeight));
    }
  };

  useEffect(() => {
    calculateBodyHeight();
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
