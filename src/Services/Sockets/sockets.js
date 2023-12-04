import {io} from 'socket.io-client';
import {SOCKET_URL} from '../Api/Common';

export const socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  transports: ['websocket'],
});
