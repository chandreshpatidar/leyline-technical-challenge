import { Message, SettlementStatus } from '@/typedefs/chat';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SettlementState {
  status: SettlementStatus;
  messages: Message[];
}

export interface SettlementAction {
  setStatus: (status: SettlementStatus) => void;
  addMessage: (message: Message) => void;
  updateMessage: (message: Message) => void;
}

export interface SettlementStore extends SettlementState, SettlementAction {}

const initialState: SettlementState = {
  status: SettlementStatus.PENDING,
  messages: [],
};

export const useSettlementStore = create(
  persist<SettlementStore>(
    (set) => ({
      ...initialState,
      setStatus: (status: SettlementStatus) => set(() => ({ status })),
      addMessage: (message: Message) => set((state) => ({ messages: [...state.messages, message] })),
      updateMessage: (message: Message) =>
        set((state) => ({ messages: state.messages.map((m) => (m.id === message.id ? message : m)) })),
    }),
    { name: 'settlement-store' }
  )
);
