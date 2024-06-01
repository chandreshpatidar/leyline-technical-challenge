import React from 'react';

interface ChatContainerProps {
  children: React.ReactNode;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ children }) => {
  return <div className='min-h-screen h-full flex flex-col bg-white'>{children}</div>;
};

export default ChatContainer;
