import { useSettlementStore } from '@/store/settlement/store';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate the body height based on the header and footer
export const calculateChatBoxBodyHeight = () => {
  const header = document.getElementById('chatHeader');
  const footer = document.getElementById('chatFooter');

  const headerRect = header?.getBoundingClientRect();
  const footerRect = footer?.getBoundingClientRect();
  const bodyHeight = window.innerHeight;

  const chatBoxBodyHeight = bodyHeight - ((headerRect?.height || 0) + (footerRect?.height || 0));

  useSettlementStore.setState({ chatBoxBodyHeight });
};
