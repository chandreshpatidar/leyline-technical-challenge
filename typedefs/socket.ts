import { Message } from './chat';

export enum SocketActionTypes {
  SYNC = 'sync',
  ALERT = 'alert',
}

export enum SocketActions {
  MESSAGE = 'message',
  SYNC_MESSAGE = 'sync-message',
}

export interface SyncMessageOptions {
  actionType: SocketActionTypes;
  message: Message;
}
