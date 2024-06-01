import React from 'react';

interface ChatMessageProps {
  message: string;
  sender: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <div
      className={`relative px-4 py-2 rounded-md font-normal text-base text-white max-w-[70%] w-fit ${
        sender ? ' self-end bg-cyan-900' : 'self-start bg-slate-700'
      }`}
    >
      <p className='z-10'>{message}</p>

      <div
        className={`absolute z-0 top-0 border-[24px] border-transparent rounded-md  ${
          sender ? '-right-4 border-t-cyan-900' : '-left-4 border-t-slate-700'
        }`}
      />
    </div>
  );
};

export default ChatMessage;
