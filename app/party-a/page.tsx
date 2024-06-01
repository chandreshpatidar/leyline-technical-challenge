'use client';

import { ChatBody, ChatContainer, ChatFooter, ChatHeader, ChatMessage } from '@/components/chat';
import { Input } from '@/components/ui/Input';
import { Message } from '@/typedefs/chat';
import React, { useCallback, useMemo, useState } from 'react';

export default function PartyA_Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [amount, setAmount] = useState<number | undefined>();
  const [message, setMessage] = useState<string>('');

  const disableSendButton = useMemo(() => {
    return typeof amount !== 'number';
  }, [amount]);

  const handleSendMessage = useCallback(() => {
    if (amount) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          sender: 'Party A',
          message,
          amount,
          timestamp: new Date().toISOString(),
        },
      ]);

      setAmount(undefined);
      setMessage('');
    }
  }, [amount, message]);

  return (
    <div>
      <ChatContainer>
        <ChatHeader>Party A</ChatHeader>
        <ChatBody>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              amount={message.amount}
              sender={message.sender === 'Party A'}
              timestamp={message.timestamp}
            />
          ))}
        </ChatBody>
        <ChatFooter
          disabled={disableSendButton}
          onSend={handleSendMessage}
        >
          <div className='flex items-center gap-3'>
            <Input
              placeholder='Enter amount'
              type='number'
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Input
              placeholder='Enter message for Party B'
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
