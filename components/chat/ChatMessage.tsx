import React from 'react';
import { DateTime } from 'luxon';
import { Message } from '@/typedefs/chat';
import { Pencil } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  userId: string;
  showEditButton?: boolean;
  onEdit?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const { message, showEditButton, userId, onEdit } = props;

  // Determine if the message is sent by the current user
  const sender = message.sender === userId;

  return (
    <div
      className={`relative px-4 py-2 rounded-md font-normal text-base text-white min-w-[250px] max-w-[70%] w-fit [&_.edit]:hover:block ${
        sender ? 'self-end bg-cyan-900' : 'self-start bg-slate-700'
      }`}
    >
      <div className='flex flex-col gap-1'>
        {/* Display message status if available */}
        {message?.status && <p className='z-10 capitalize'>Status: {message.status} </p>}
        {/* Display message amount if available */}
        {message?.amount && <p className='z-10'>Amount: $ {message.amount} </p>}
        {/* Display message content if available */}
        {message?.message && <p className='z-10 text-sm'>{message.message}</p>}
      </div>

      <div className='flex items-center justify-between mt-4 min-h-7'>
        {/* Show edit button if the condition is met */}
        {showEditButton && (
          <button
            onClick={onEdit}
            className='edit hidden rounded-full p-1.5 bg-transparent text-white hover:text-slate-700 hover:bg-gray-200'
            title='Edit'
          >
            <Pencil size={16} />
          </button>
        )}
        {/* Display relative timestamp of the message */}
        <small className='text-right flex-grow'>
          <i>{DateTime.fromISO(message.timestamp).toRelative()}</i>
        </small>
      </div>

      <div
        className={`absolute z-0 top-0 border-[24px] border-transparent rounded-md ${
          sender ? '-right-4 border-t-cyan-900' : '-left-4 border-t-slate-700'
        }`}
      />
    </div>
  );
};

export default ChatMessage;
