export interface Message {
  id: string;
  sender: string;
  status: SettlementStatus;
  timestamp: string;
  amount?: number;
  message?: string;
}

export enum SettlementStatus {
  PENDING = 'pending',
  SETTLED = 'settled',
  DISPUTE = 'dispute',
}
