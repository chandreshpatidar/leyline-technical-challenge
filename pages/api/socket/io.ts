import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer, Socket } from 'net';
import { Server as IoServer } from 'socket.io';
import { UserIds } from '@/typedefs/user';
import { SocketActionTypes, SocketActions } from '@/typedefs/socket';

interface NextApiResponseIO extends NextApiResponse {
  socket: Socket & {
    server: NetServer & { io: IoServer };
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponseIO) {
  if (!res?.socket?.server?.io) {
    const path = '/api/socket/io';
    const io = new IoServer(res.socket.server as any, {
      path,
      addTrailingSlash: false,
    });

    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('connection', socket.id);
      // Set up the message event listener for the connected socket
      socket.on(SocketActions.MESSAGE, (message) => {
        if (message?.sender === UserIds.PARTY_A) {
          // Broadcast a sync message to all other connected clients
          socket.broadcast.emit(SocketActions.SYNC_MESSAGE, { actionType: SocketActionTypes.SYNC, message });
        } else {
          // Broadcast an alert message to all other connected clients
          socket.broadcast.emit(SocketActions.SYNC_MESSAGE, { actionType: SocketActionTypes.ALERT, message });
        }
      });

      // Set up the disconnect event listener for the connected socket
      socket.on('disconnect', () => {
        // Add logic to handle disconnection
        console.log('disconnect', socket.id);
      });
    });
  }

  res.end();
}
