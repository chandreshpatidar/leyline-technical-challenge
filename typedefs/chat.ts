export interface Message {
  id: string;
  sender: string;
  timestamp: string;
  status?: SettlementStatus;
  amount?: number;
  message?: string;
}

export enum SettlementStatus {
  PENDING = 'pending',
  SETTLED = 'settled',
  DISPUTE = 'dispute',
}
