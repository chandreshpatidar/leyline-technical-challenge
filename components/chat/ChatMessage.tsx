import React from 'react';
import { DateTime } from 'luxon';
import { SettlementStatus } from '@/typedefs/chat';

interface ChatMessageProps {
  sender: boolean;
  timestamp: string;
  message?: string;
  amount?: number;
  status?: SettlementStatus;
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const { message, sender, amount, timestamp, status } = props;

  return (
    <div
      className={`relative px-4 py-2 rounded-md font-normal text-base text-white max-w-[70%] w-fit ${
        sender ? ' self-end bg-cyan-900' : 'self-start bg-slate-700'
      }`}
    >
      <div className='flex flex-col gap-1'>
        {status && <p className='z-10 capitalize'>Staus: {status} </p>}
        {amount && <p className='z-10'>Amount: $ {amount} </p>}
        {message && <p className='z-10 text-sm'>{message}</p>}
      </div>

      <small className='text-right block mt-4'>
        <i>{DateTime.fromISO(timestamp).toRelative()}</i>
      </small>

      <div
        className={`absolute z-0 top-0 border-[24px] border-transparent rounded-md  ${
          sender ? '-right-4 border-t-cyan-900' : '-left-4 border-t-slate-700'
        }`}
      />
    </div>
  );
};

export default ChatMessage;
