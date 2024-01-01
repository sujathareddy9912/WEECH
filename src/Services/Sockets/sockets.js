import {io} from 'socket.io-client';
import {SOCKET_URL} from '../Api/Common';

export const socket = io(SOCKET_URL, {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
});
