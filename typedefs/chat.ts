export interface Message {
  id: string;
  sender: string;
  amount?: number;
  message?: string;
  timestamp: string;
}
