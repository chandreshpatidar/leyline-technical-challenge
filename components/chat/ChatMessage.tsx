import React, { useMemo } from 'react';
import { DateTime } from 'luxon';
import { Message, SettlementStatus } from '@/typedefs/chat';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const { status, bgColor, border } = useMemo(() => {
    switch (message?.status) {
      case SettlementStatus.DISPUTE:
        return {
          status: "Party B has desputed the amount. Don't worry, you can propose a new amount!!",
          bgColor: 'bg-red-400',
          border: 'border-t-red-400',
        };

      case SettlementStatus.SETTLED:
        return {
          status: 'Congratulations! Party B has settled the amount.',
          bgColor: 'bg-emerald-500',
          border: 'border-t-emerald-500',
        };

      default:
        return {
          status: false,
          bgColor: sender ? 'bg-cyan-900' : 'bg-slate-700',
          border: sender ? 'border-t-cyan-900' : 'border-t-slate-700',
        };
    }
  }, [message.status, sender]);

  return (
    <div
      className={cn(
        'relative px-4 py-2 rounded-md font-normal text-base text-white min-w-[250px] max-w-[70%] w-fit [&_.edit]:hover:block',
        sender ? 'self-end' : 'self-start',
        bgColor
      )}
    >
      <div className='flex flex-col gap-1'>
        {/* Display message status if available */}
        {status && <p className='z-10 capitalize'>{status} </p>}
        {/* Display message amount if available */}
        {message?.amount && <p className='z-10'>Amount: $ {message.amount} </p>}
        {/* Display message content if available */}
        {message?.message && <p className='z-10 text-xs'>Message: {message.message}</p>}
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
        className={cn(
          'absolute z-0 top-0 border-[24px] border-transparent rounded-md',
          sender ? '-right-4' : '-left-4',
          border
        )}
      />
    </div>
  );
};

export default ChatMessage;
