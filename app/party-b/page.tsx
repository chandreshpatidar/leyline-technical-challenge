'use client';

import { ChatBody, ChatContainer, ChatFooter, ChatHeader, ChatMessage } from '@/components/chat';
import { Input } from '@/components/ui/Input';
import { Message, SettlementStatus } from '@/typedefs/chat';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PartyB_Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<SettlementStatus | undefined>();
  const [message, setMessage] = useState<string>('');

  const disableSendButton = useMemo(() => {
    return !status;
  }, [status]);

  const handleSendMessage = useCallback(() => {
    if (status) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          sender: 'Party B',
          message,
          status,
          timestamp: new Date().toISOString(),
        },
      ]);

      setStatus(undefined);
      setMessage('');
    }
  }, [status, message]);

  return (
    <div>
      <ChatContainer>
        <ChatHeader>Party B</ChatHeader>
        <ChatBody>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              amount={message.amount}
              status={message.status}
              sender={message.sender === 'Party B'}
              timestamp={message.timestamp}
            />
          ))}
        </ChatBody>
        <ChatFooter
          disabled={disableSendButton}
          onSend={handleSendMessage}
        >
          <div className='flex items-center gap-3'>
            <Select
              value={status || ''}
              onValueChange={(value) => setStatus(value as SettlementStatus)}
            >
              <SelectTrigger className='w-[450px]'>
                <SelectValue placeholder='Select settlement stage' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={SettlementStatus.SETTLED}>Settle</SelectItem>
                  <SelectItem value={SettlementStatus.DISPUTE}>Dispute</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input
              placeholder='Enter message for Party A'
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </ChatFooter>
      </ChatContainer>
    </div>
  );
}
