'use client';

import { ChatBody, ChatContainer, ChatFooter, ChatHeader, ChatMessage } from '@/components/chat';
import { Input } from '@/components/ui/Input';
import { calculateChatBoxBodyHeight } from '@/lib/utils';
import { useSettlementStore } from '@/store/settlement/store';
import { Message, SettlementStatus } from '@/typedefs/chat';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

export default function PartyA_Page() {
  // Extracting state and actions from the settlement store
  const { addMessage, messages, setStatus, status, updateMessage, lastDesputtedMessageIndex } = useSettlementStore(
    (state) => state
  );

  // State to manage the current message being edited or created
  const [message, setMessage] = useState<Message | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Memoize the condition to show the footer based on the settlement status
  const showFooter = useMemo(() => {
    return status !== SettlementStatus.SETTLED;
  }, [status]);

  // Recalculate chat box height whenever the footer visibility changes
  useEffect(() => {
    calculateChatBoxBodyHeight();
  }, [showFooter]);

  // Determine if the edit button should be shown for a message
  const showEditButton = useCallback(
    (message: Message, messageIndex: number) => {
      return (
        status !== SettlementStatus.SETTLED &&
        message.sender === 'Party A' &&
        Number(lastDesputtedMessageIndex) < messageIndex + 1
      );
    },
    [status, lastDesputtedMessageIndex]
  );

  // Handle changes in input fields and update the message state
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage({ ...message, [event.target.name]: event.target.value } as unknown as Message);
  };

  // Handle the click event of the edit button
  const handleEditMessageButtonClick = useCallback((message: Message) => {
    setMessage(message);
    setIsEditing(true);
  }, []);

  // Handle sending the message
  const handleSendMessage = useCallback(() => {
    if (message?.amount) {
      if (isEditing && status === SettlementStatus.PENDING) {
        // Update the existing message if in edit mode
        updateMessage({
          ...message,
          amount: Number(message?.amount),
          timestamp: new Date().toISOString(),
        });

        setIsEditing(false);
      } else {
        // Add a new message if not in edit mode
        addMessage({
          id: Date.now().toString(),
          sender: 'Party A',
          message: message?.message,
          amount: Number(message?.amount),
          timestamp: new Date().toISOString(),
        });

        // Set the status to pending after adding a new message
        setStatus(SettlementStatus.PENDING);
      }

      // Clear the message input fields
      setMessage(undefined);
    }
  }, [message, isEditing, status, updateMessage, addMessage, setStatus]);

  return (
    <div>
      <ChatContainer>
        <ChatHeader>Party A</ChatHeader>
        <ChatBody>
          {/* Render each message in the chat body */}
          {messages.map((message, messageIndex) => (
            <ChatMessage
              key={message.id}
              message={message}
              userId='Party A'
              showEditButton={showEditButton(message, messageIndex)}
              onEdit={() => handleEditMessageButtonClick(message)}
            />
          ))}
        </ChatBody>

        {/* Show the footer if the settlement is not settled */}
        {showFooter && (
          <ChatFooter
            disabled={!message?.amount}
            onSend={handleSendMessage}
          >
            <div className='flex items-center gap-3'>
              <Input
                placeholder='Enter amount'
                type='number'
                name='amount'
                value={message?.amount || ''}
                onChange={handleInputChange}
              />
              <Input
                placeholder='Enter message for Party B'
                type='text'
                name='message'
                value={message?.message || ''}
                onChange={handleInputChange}
              />
            </div>
          </ChatFooter>
        )}
      </ChatContainer>
    </div>
  );
}
