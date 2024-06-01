'use client';

import { ChatBody, ChatContainer, ChatFooter, ChatHeader, ChatMessage } from '@/components/chat';
import { Input } from '@/components/ui/Input';
import { Message, SettlementStatus } from '@/typedefs/chat';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettlementStore } from '@/store/settlement/store';
import { calculateChatBoxBodyHeight } from '@/lib/utils';
import { socket } from '../socket';
import { SocketActionTypes, SocketActions, SyncMessageOptions } from '@/typedefs/socket';
import { UserIds } from '@/typedefs/user';

export default function PartyB_Page() {
  // Extracting state and actions from the settlement store
  const { addMessage, messages, setStatus, status, setLastDesputtedMessageIndex } = useSettlementStore(
    (state) => state
  );

  // State to manage the current message being created
  const [message, setMessage] = useState<Message | undefined>();

  // Memoize the condition to disable the message send button
  const disableSendButton = useMemo(() => {
    return !message?.status || messages[messages.length - 1]?.sender === UserIds.PARTY_B;
  }, [message, messages]);

  // Memoize the condition to show the footer based on the settlement status and the sender of the first message
  const showFooter = useMemo(() => {
    return status !== SettlementStatus.SETTLED && messages[0]?.sender === UserIds.PARTY_A;
  }, [status, messages]);

  // Recalculate chat box height whenever the footer visibility changes
  useEffect(() => {
    calculateChatBoxBodyHeight();
  }, [showFooter]);

  // Handle sync messages from the socket
  useEffect(() => {
    const syncStore = (options: SyncMessageOptions) => {
      if (options.actionType === SocketActionTypes.SYNC) {
        // Rehydrate the store
        useSettlementStore.persist.rehydrate();

        // Recalculate chat box height
        calculateChatBoxBodyHeight();
      }
    };

    // Set up event listener for sync messages
    socket.on(SocketActions.SYNC_MESSAGE, syncStore);

    // Cleanup function to remove event listener on unmount
    return () => {
      socket.off(SocketActions.SYNC_MESSAGE);
    };
  }, []);

  // Handle sending the message
  const handleSendMessage = useCallback(() => {
    if (message?.status && status !== SettlementStatus.SETTLED) {
      // Add a new message
      addMessage({
        id: Date.now().toString(),
        sender: UserIds.PARTY_B,
        message: message?.message,
        status: message?.status,
        timestamp: new Date().toISOString(),
      });

      // If the status is a dispute, update the last disputed message index
      if (message.status === SettlementStatus.DISPUTE) {
        setLastDesputtedMessageIndex(messages.length);
      }

      // Update the status of the settlement
      setStatus(message.status);

      // Send the message to the server
      socket.emit(SocketActions.MESSAGE, message);

      // Clear the message input fields
      setMessage(undefined);
    }
  }, [message, status, addMessage, setStatus, setLastDesputtedMessageIndex, messages.length]);

  // Handle selection of settlement status from the dropdown
  const handleSelectSettlementOption = (value: SettlementStatus) => {
    setMessage({ ...(message || {}), status: value as SettlementStatus } as unknown as Message);
  };

  // Handle changes in input fields and update the message state
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage({ ...message, [event.target.name]: event.target.value } as unknown as Message);
  };

  return (
    <div>
      <ChatContainer>
        <ChatHeader>Party B</ChatHeader>
        <ChatBody>
          {/* Render each message in the chat body */}
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              userId={UserIds.PARTY_B}
            />
          ))}

          {/* Show a message if there are no messages indicating that Party A has not initialized the settlement */}
          {!messages.length && (
            <p className='text-xl font-semibold text-center'>Settlement not initialized yet by Party A</p>
          )}
        </ChatBody>

        {/* Show the footer if the settlement is not settled and Party A has initialized the settlement */}
        {showFooter && (
          <ChatFooter
            disabled={disableSendButton}
            onSend={handleSendMessage}
          >
            <div className='flex items-center gap-3'>
              <Select
                value={message?.status || ''}
                onValueChange={handleSelectSettlementOption}
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
