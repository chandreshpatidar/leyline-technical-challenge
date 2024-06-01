import { SendHorizonal } from 'lucide-react';
import React from 'react';

interface ChatFooterProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSend: () => void;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ children, disabled, onSend }) => {
  return (
    <div
      id={'chatFooter'}
      className='px-5 py-4 bg-transparent flex justify-center gap-3'
    >
      <div className='flex items-center gap-3 flex-wrap flex-grow'>{children}</div>

      <div>
        <button
          disabled={disabled}
          onClick={onSend}
          className='rounded-full p-3 bg-indigo-500 text-white hover:bg-indigo-600'
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatFooter;
