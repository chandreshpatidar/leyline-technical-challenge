'use client';

import { ChatBody, ChatContainer, ChatFooter, ChatHeader, ChatMessage } from '@/components/chat';
import { Input } from '@/components/ui/Input';
import { SettlementStatus } from '@/typedefs/chat';
import React, { useCallback, useMemo, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettlementStore } from '@/store/settlement/store';

export default function PartyB_Page() {
  const { addMessage, messages, setStatus, status, updateMessage } = useSettlementStore((state) => state);
  const [message, setMessage] = useState<string>('');

  const disableSendButton = useMemo(() => {
    return !status;
  }, [status]);

  const handleSendMessage = useCallback(() => {
    if (status) {
      addMessage({
        id: Date.now().toString(),
        sender: 'Party B',
        message,
        status,
        timestamp: new Date().toISOString(),
      });

      setMessage('');
    }
  }, [status, addMessage, message]);

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
